use iota_streams::{
    app::transport::tangle::client::Client,
    app_channels::api::tangle::{Address, Author, Bytes, ChannelType, Subscriber},
    core::{println, Result},
};

use core::str::FromStr;
use iota_streams::app_channels::api::tangle::MessageContent;
use rand::Rng;

pub async fn publish(node_url: &str, addr: &str) -> Result<()> {
    let ALPH9: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    // Generate a unique seed for the author
    let seed: &str = &(0..81)
        .map(|_| {
            ALPH9
                .chars()
                .nth(rand::thread_rng().gen_range(0, 27))
                .unwrap()
        })
        .collect::<String>();

    // Create the Transport Client
    let client = Client::new_from_url(node_url);

    // Generate an Author
    let mut author = Author::new(seed, ChannelType::SingleBranch, client.clone());

    // Create the channel with an announcement message. Make sure to save the resulting link somewhere,
    let announcement_link = author.send_announce().await?;
    // This link acts as a root for the channel itself
    let ann_link_string = announcement_link.to_string();
    
    // println!(
    //     "Address: {}\nAnnouncement Link: {}\nTangle Index: {:#}\n",
    //     addr,
    //     announcement_link.to_msg_index(),
    //     ann_link_string
    // );
    println!("{:#}\n", ann_link_string);

    let mut prev_msg_link = announcement_link;
    let (msg_link, _seq_link) = author
        .send_signed_packet(
            &prev_msg_link,
            &Bytes::default(),
            &Bytes(addr.as_bytes().to_vec()),
        )
        .await?;
    prev_msg_link = msg_link;

    Ok(())
}

pub async fn subscribe(node_url: &str, ann_link_string: String) -> Result<()> {
    // In their own separate instances generate the subscriber(s) that will be attaching to the channel
    let client = Client::new_from_url(node_url);
    let mut subscriber = Subscriber::new("Car", client);

    // Generate an Address object from the provided announcement link string from the Author
    let ann_address = Address::from_str(&ann_link_string)?;

    // Receive the announcement message to start listening to the channel
    subscriber.receive_announcement(&ann_address).await?;

    let retrieved = subscriber.fetch_all_next_msgs().await;

    let processed_msgs = retrieved
        .iter()
        .map(|msg| {
            let content = &msg.body;
            match content {
                MessageContent::SignedPacket {
                    pk: _,
                    public_payload: _,
                    masked_payload,
                } => String::from_utf8(masked_payload.0.to_vec()).unwrap(),
                _ => String::default(),
            }
        })
        .filter(|s| s != &String::default())
        .collect::<Vec<String>>();

    print!("Retrieved messages: ");
    for i in 0..processed_msgs.len() {
        print!("{}, ", processed_msgs[i]);
    }
    println!();

    Ok(())
}

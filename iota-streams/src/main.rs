use anyhow::Result;
use std::env;

mod single_branch_public;

#[tokio::main]
async fn main() -> Result<()> {
    let node_url = "https://api.lb-0.h.chrysalis-devnet.iota.cafe";

    let args: Vec<String> = env::args().collect();
    let api = args[1].clone();

    if api == String::from("publish") {
        let addr: &str = &args[2];
        single_branch_public::publish(node_url, addr).await?;
    } else {
        let announcement_link = args[2].clone();
        single_branch_public::subscribe(node_url, announcement_link).await?;
    }

    Ok(())
}

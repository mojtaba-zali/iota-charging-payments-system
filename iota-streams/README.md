# IOTA Streams - Send Address From Charger to Car
In order to transfer the payment address from charger to car, two steps are involved:

Publish the address to tangle using the iota stream from the charger: 
```
cargo run -- publish address
cargo run -- publish payment_address_of_the_charger
```

output is something like this (which is the tangle index): 

```
8a228b671d73cac6317d0448d19bb0abfe114c4f1c8c3be87c8ab21d08d551940000000000000000:9e071bf42bad59dc6613677f
```

Subscribe to the tangle index to get the address:

```
cargo run -- subscribe tangle_index
cargo run -- subscribe 8a228b671d73cac6317d0448d19bb0abfe114c4f1c8c3be87c8ab21d08d551940000000000000000:9e071bf42bad59dc6613677f
```

output is something like this:

```
Retrieved messages: payment_address_of_the_charger
```
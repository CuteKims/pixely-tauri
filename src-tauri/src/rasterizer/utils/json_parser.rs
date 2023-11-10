use std::collections::HashMap;
use serde::Deserialize;

#[derive(Deserialize)]
struct AssetsHashMap {
    objects: HashMap<String, AssetObject>
}

#[derive(Deserialize)]
struct AssetObject {
    hash: String,
    size: usize
}
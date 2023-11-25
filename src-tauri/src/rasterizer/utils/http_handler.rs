pub async fn get(target: &str) -> Result<String, String> {
    let to_string = |error: reqwest::Error| error.to_string();
    Ok(reqwest::get(target).await.map_err(to_string)?.text().await.map_err(to_string)?)
}
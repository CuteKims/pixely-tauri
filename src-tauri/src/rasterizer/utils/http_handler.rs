pub async fn get(target: &str) -> Result<String, Box<dyn std::error::Error>> {
    Ok(reqwest::get(target).await?.text().await?)
}
$clientId = "4594f547b3344085bc07aabe553d52de";
$clientSecret = "08453de2a841498abd99304050b66dd3";
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${clientId}:${clientSecret}"))


$headers = @{
    Authorization = "Basic $auth"
    "Content-Type" = "application/x-www-form-urlencoded"
}

$body = "grant_type=client_credentials"

$response = Invoke-RestMethod -Uri "https://accounts.spotify.com/api/token" `
    -Method POST `
    -Headers $headers `
    -Body $body

$response.access_token

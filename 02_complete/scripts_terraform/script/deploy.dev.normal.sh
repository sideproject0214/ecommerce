ARM_CLIENT_ID="701eee9d-1de1-48cd-85cf-e51935e5233d"
ARM_CLIENT_SECRET="kNt8Q~JLE0LOulD4UmNDjzC2lU-xGGiqc7U-db~e"

# App version
VERSION=12

cd ./scripts_terraform

# \n : 줄바꿈
echo "\n\nTerraform Init Starting \n"

terraform init 

echo "\n\nTerraform Apply Starting\n"

terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "client_id=$ARM_CLIENT_ID" \
    -var "client_secret=$ARM_CLIENT_SECRET" \

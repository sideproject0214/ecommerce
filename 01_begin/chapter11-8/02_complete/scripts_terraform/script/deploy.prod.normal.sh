echo "App Version: $VERSION"

cd ./scripts_terraform

echo "Terraform Init Starting"

terraform init 

echo "Terraform Apply Starting"

terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "client_id=$ARM_CLIENT_ID" \
    -var "client_secret=$ARM_CLIENT_SECRET" \

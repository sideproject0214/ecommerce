cd ./scripts_terraform

echo "Terraform Init Starting"

terraform init 

echo "Terraform Apply Starting"

terraform destroy -auto-approve \
    -var "app_version=$VERSION" 
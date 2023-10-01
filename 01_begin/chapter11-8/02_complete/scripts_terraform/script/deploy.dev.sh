RESOURCE_GROUP_NAME=ecommercessaplerg
STORAGE_ACCOUNT_NAME=ecommercessaplest
CONTAINER_NAME=ecommercessaple-tfstate

ARM_SUBSCRIPTION_ID="15d4e126-1534-4374-9990-697a16767ed0"
ARM_CLIENT_ID="a3ac4ed0-1015-49a8-a70a-b28519bad581"
ARM_CLIENT_SECRET="DPs8Q~GBK.XJ2xGo67mKS2i3HTcerOAoy-3gbc5c"
ARM_TENANT_ID="44cc4cf7-3581-4f92-a98e-fe05c761e365"

# Create resource group
az group create --name $RESOURCE_GROUP_NAME --location "Korea Central"

# Create storage account
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob

# Get storage account key
ACCOUNT_KEY=$(az storage account keys list --resource-group $RESOURCE_GROUP_NAME --account-name $STORAGE_ACCOUNT_NAME --query [0].value -o tsv)

# Create blob container
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME --account-key $ACCOUNT_KEY

# App version
VERSION=1

echo "storage_account_name: $STORAGE_ACCOUNT_NAME"
echo "container_name: $CONTAINER_NAME"
echo "access_key: $ACCOUNT_KEY"


cd ./scripts_terraform

# \n : 줄바꿈
echo "\n\nTerraform Init Starting \n"

terraform init 

echo "\n\nTerraform Apply Starting\n"

terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "client_id=$ARM_CLIENT_ID" \
    -var "client_secret=$ARM_CLIENT_SECRET" \

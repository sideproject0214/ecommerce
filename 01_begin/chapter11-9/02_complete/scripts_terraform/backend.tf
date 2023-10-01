# ch11-8
terraform {
  backend "azurerm" {
    resource_group_name = "ecommercessaplerg"
    storage_account_name = "ecommercessaplest"
    container_name = "ecommercessaple-tfstate"
    key = "terraform.tfstate"   
  }
}
# ch11-2
resource "azurerm_resource_group" "ecommerce" {
  name = var.rg_name
  location = var.location
}
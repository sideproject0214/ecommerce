# ch11-4
resource "azurerm_kubernetes_cluster" "cluster" {
  name = var.app_name
  location = var.location
  resource_group_name = azurerm_resource_group.ecommerce.name
  dns_prefix = var.dns_prefix
  kubernetes_version = "1.27.1"

  linux_profile {
    admin_username = var.app_name

    ssh_key {
      key_data = "${trimspace(tls_private_key.key.public_key_openssh)} ${var.app_name}@azure.com"
    }
  }

  default_node_pool {
    name = "default"
    node_count = 1
    vm_size = "Standard_B2ms"
  }

  identity {
    type = "SystemAssigned"
	}
}
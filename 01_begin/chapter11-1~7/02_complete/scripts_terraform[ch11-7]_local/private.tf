# ch11-4
resource "tls_private_key" "key" {
  algorithm = "RSA"  
  rsa_bits = 4096
}


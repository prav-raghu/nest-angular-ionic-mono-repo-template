# variables.tf

# AWS variables
variable "aws_region" {
  type        = string
  description = "AWS Region"
}

variable "aws_profile" {
  type        = string
  description = "AWS Profile name from your AWS CLI config"
}

# GCP variables ✅
variable "gcp_project" {
  type        = string
  description = "GCP Project ID"
}

variable "gcp_region" {
  type        = string
  description = "GCP Region (e.g. us-central1)"
}

variable "azure_subscription_id" {
  type        = string
  description = "Azure Subscription ID"
}

variable "azure_region" {
  type        = string
  description = "Azure region (e.g. eastus)"
}

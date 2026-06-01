terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ----------------------
# NETWORK
# ----------------------

resource "aws_vpc" "tamkeen_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.tamkeen_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

# ----------------------
# ECR (Docker Registry)
# ----------------------

resource "aws_ecr_repository" "api" {
  name = "tamkeen-api"
}

resource "aws_ecr_repository" "web" {
  name = "tamkeen-web"
}

# ----------------------
# RDS (PostgreSQL Ledger)
# ----------------------

resource "aws_db_instance" "postgres" {
  identifier        = "tamkeen-ledger"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20

  db_name  = "tamkeen"
  username = "tamkeen"
  password = var.db_password

  skip_final_snapshot = true
}

# ----------------------
# ECS CLUSTER
# ----------------------

resource "aws_ecs_cluster" "tamkeen" {
  name = "tamkeen-cluster"
}

# ----------------------
# VARIABLES
# ----------------------

variable "aws_region" {
  default = "us-east-1"
}

variable "db_password" {
  sensitive = true
}
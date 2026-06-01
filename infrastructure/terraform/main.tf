terraform {
  required_version = ">= 1.5.0"
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

############################
# NETWORK (VPC)
############################

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "tamkeen-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway  = false

  tags = {
    Project = "tamkeen"
    Env     = "production"
  }
}

############################
# EKS CLUSTER
############################

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.0.0"

  cluster_name    = "tamkeen-eks"
  cluster_version = "1.29"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      instance_types = ["t3.large"]
      min_size       = 3
      max_size       = 10
      desired_size   = 4
    }
  }
}

############################
# DATABASE (RDS POSTGRES)
############################

resource "aws_db_instance" "postgres" {
  identifier        = "tamkeen-postgres"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.medium"
  allocated_storage = 100

  db_name  = "tamkeen"
  username = "tamkeen"
  password = "CHANGE_ME_SECURE"

  multi_az               = true
  publicly_accessible    = false
  skip_final_snapshot    = true

  vpc_security_group_ids = [aws_security_group.db.id]
}

############################
# REDIS (CACHE)
############################

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "tamkeen-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "tamkeen-redis-subnet"
  subnet_ids = module.vpc.private_subnets
}

############################
# KAFKA (MSK)
############################

resource "aws_msk_cluster" "kafka" {
  cluster_name           = "tamkeen-msk"
  kafka_version          = "3.5.1"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type   = "kafka.m5.large"
    client_subnets  = module.vpc.private_subnets
    security_groups = [aws_security_group.kafka.id]
  }
}

############################
# SECURITY GROUPS
############################

resource "aws_security_group" "db" {
  name   = "tamkeen-db-sg"
  vpc_id = module.vpc.vpc_id
}

resource "aws_security_group" "kafka" {
  name   = "tamkeen-kafka-sg"
  vpc_id = module.vpc.vpc_id
}

############################
# OUTPUTS
############################

output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

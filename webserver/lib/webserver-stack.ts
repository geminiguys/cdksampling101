import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class WebserverStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'WebserverQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    //VPC and subnets

    const vpc = new ec2.Vpc(this, 'IDASTestVPC', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.1.0/24'),
      vpcName: 'IDASTestVPC',
      maxAzs: 3,
      natGateways: 1,
      subnetConfiguration: [

        {
          name: 'idas-public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 27
        },

    
        {
          name: 'idas-private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 27
        }


      ]

    });

    // Security group
    const demoSG = new ec2.SecurityGroup(this, 'demoSG', {
      vpc: vpc,
      securityGroupName: 'Allow HTTP traffic',
      allowAllOutbound: true,

      
    });

    demoSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http traffic');

    //EC2 instance

    const demoEC2 = new ec2.Instance(this, 'demoEC2', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc: vpc,
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
      machineImage: new ec2.AmazonLinuxImage(),
      securityGroup: demoSG
    })
  }
}

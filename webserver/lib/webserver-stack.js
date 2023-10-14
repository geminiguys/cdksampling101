"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebserverStack = void 0;
const cdk = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class WebserverStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            machineImage: new ec2.AmazonLinuxImage(),
            securityGroup: demoSG
        });
    }
}
exports.WebserverStack = WebserverStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vic2VydmVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQywyQ0FBMkM7QUFDM0MsOENBQThDO0FBRTlDLE1BQWEsY0FBZSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBRTdDLG1CQUFtQjtRQUNuQix3REFBd0Q7UUFDeEQsaURBQWlEO1FBQ2pELE1BQU07UUFDTixpQkFBaUI7UUFFakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDM0MsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxPQUFPLEVBQUUsYUFBYTtZQUN0QixNQUFNLEVBQUUsQ0FBQztZQUNULFdBQVcsRUFBRSxDQUFDO1lBQ2QsbUJBQW1CLEVBQUU7Z0JBRW5CO29CQUNFLElBQUksRUFBRSxvQkFBb0I7b0JBQzFCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0JBQ2pDLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2dCQUdEO29CQUNFLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtvQkFDM0MsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFHRjtTQUVGLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNuRCxHQUFHLEVBQUUsR0FBRztZQUNSLGlCQUFpQixFQUFFLG9CQUFvQjtZQUN2QyxnQkFBZ0IsRUFBRSxJQUFJO1NBR3ZCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBRWxGLGNBQWM7UUFFZCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNoRCxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDL0UsR0FBRyxFQUFFLEdBQUc7WUFDUixVQUFVLEVBQUUsRUFBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUM7WUFDL0MsWUFBWSxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTFERCx3Q0EwREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5cbmV4cG9ydCBjbGFzcyBXZWJzZXJ2ZXJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgLy8gZXhhbXBsZSByZXNvdXJjZVxuICAgIC8vIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnV2Vic2VydmVyUXVldWUnLCB7XG4gICAgLy8gICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKVxuICAgIC8vIH0pO1xuICAgIC8vVlBDIGFuZCBzdWJuZXRzXG5cbiAgICBjb25zdCB2cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAnSURBU1Rlc3RWUEMnLCB7XG4gICAgICBpcEFkZHJlc3NlczogZWMyLklwQWRkcmVzc2VzLmNpZHIoJzEwLjAuMS4wLzI0JyksXG4gICAgICB2cGNOYW1lOiAnSURBU1Rlc3RWUEMnLFxuICAgICAgbWF4QXpzOiAzLFxuICAgICAgbmF0R2F0ZXdheXM6IDEsXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXG5cbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpZGFzLXB1YmxpYy1zdWJuZXQnLFxuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyxcbiAgICAgICAgICBjaWRyTWFzazogMjdcbiAgICAgICAgfSxcblxuICAgIFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2lkYXMtcHJpdmF0ZS1zdWJuZXQnLFxuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBSSVZBVEVfSVNPTEFURUQsXG4gICAgICAgICAgY2lkck1hc2s6IDI3XG4gICAgICAgIH1cblxuXG4gICAgICBdXG5cbiAgICB9KTtcblxuICAgIC8vIFNlY3VyaXR5IGdyb3VwXG4gICAgY29uc3QgZGVtb1NHID0gbmV3IGVjMi5TZWN1cml0eUdyb3VwKHRoaXMsICdkZW1vU0cnLCB7XG4gICAgICB2cGM6IHZwYyxcbiAgICAgIHNlY3VyaXR5R3JvdXBOYW1lOiAnQWxsb3cgSFRUUCB0cmFmZmljJyxcbiAgICAgIGFsbG93QWxsT3V0Ym91bmQ6IHRydWUsXG5cbiAgICAgIFxuICAgIH0pO1xuXG4gICAgZGVtb1NHLmFkZEluZ3Jlc3NSdWxlKGVjMi5QZWVyLmFueUlwdjQoKSwgZWMyLlBvcnQudGNwKDgwKSwgJ2FsbG93IGh0dHAgdHJhZmZpYycpO1xuXG4gICAgLy9FQzIgaW5zdGFuY2VcblxuICAgIGNvbnN0IGRlbW9FQzIgPSBuZXcgZWMyLkluc3RhbmNlKHRoaXMsICdkZW1vRUMyJywge1xuICAgICAgaW5zdGFuY2VUeXBlOiBlYzIuSW5zdGFuY2VUeXBlLm9mKGVjMi5JbnN0YW5jZUNsYXNzLlQzLCBlYzIuSW5zdGFuY2VTaXplLk1JQ1JPKSxcbiAgICAgIHZwYzogdnBjLFxuICAgICAgdnBjU3VibmV0czoge3N1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQ30sXG4gICAgICBtYWNoaW5lSW1hZ2U6IG5ldyBlYzIuQW1hem9uTGludXhJbWFnZSgpLFxuICAgICAgc2VjdXJpdHlHcm91cDogZGVtb1NHXG4gICAgfSlcbiAgfVxufVxuIl19
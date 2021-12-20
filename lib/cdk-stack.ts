import { aws_s3 as s3, aws_dynamodb as dynamodb,  Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TutoCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 👇 use the Bucket construct
    const bucket = new s3.Bucket(this, "avatars-bucket", {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // 👇 use the Table construct
    const table = new dynamodb.Table(this, "todos-table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "bucketName", {
      value: bucket.bucketName,
    });
    new CfnOutput(this, "tableName", { value: table.tableName });
  }
}

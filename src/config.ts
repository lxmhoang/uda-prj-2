export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": "us-west-2",
    "aws_profile": "DEPLOYED",
    "aws_media_bucket": "elasticbeanstalk-us-west-2-375600206188"
  },
  "jwt": {
    "secret": "adfasdf"
  },
  "prod": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": "us-west-2",
    "aws_profile": "DEPLOYED",
    "aws_media_bucket": "elasticbeanstalk-us-west-2-375600206188"
  }
}

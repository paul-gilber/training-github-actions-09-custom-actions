import os
import boto3
import mimetypes
from botocore.config import Config


def run():
    # Generated Environment Variable
    # INPUT_<input name | uppercase>
    bucket_name   = os.environ['INPUT_BUCKET-NAME']
    bucket_region = os.environ['INPUT_BUCKET-REGION']
    dist_folder   = os.environ['INPUT_DIST-FOLDER']

    configuration = Config(region_name=bucket_region)

    s3_client = boto3.client('s3', config=configuration)

    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(
                os.path.join(root, file),
                bucket_name,
                os.path.join(root, file).replace(dist_folder + '/', ''),
                ExtraArgs={"ContentType": mimetypes.guess_type(file)[0]}
            )

    website_url = f'http://{bucket_name}.s3-website-{bucket_region}.amazonaws.com'
    # The below code sets the 'website-url' output (python equivalent of: echo "website-url=<value>" >> $GITHUB_OUTPUT)
    with open(os.environ['GITHUB_OUTPUT'], 'a') as gh_output:
        print(f'website-url={website_url}', file=gh_output)


if __name__ == '__main__':
    run()

import * as statement from 'iam-floyd'
import { writeFile, writeFileSync } from 'fs';
import { Ec2, S3 } from 'iam-floyd';

const ec2ReadOnly = [
    new Ec2().allReadActions().allListActions().onAllResources().compact().toJSON()
]
const s3ViewOnly = [
    new S3().allReadActions().allListActions().onAllResources().compact().toJSON(),
    new S3().deny().toGetObject().onObject('*', '*').compact().toJSON()
]

const policies = {
    ec2ReadOnly,
    s3ViewOnly
}

for (let [name, policy] of Object.entries(policies)) {
    writeFileSync(`generated/${name}.json`, JSON.stringify(policy, null, 2))
}

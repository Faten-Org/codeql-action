import test from 'ava';
import * as fs from "fs";
import * as path from "path";

import * as configUtils from "./config-utils";
import * as externalQueries from "./external-queries";
import * as util from "./util";

test("checkoutExternalQueries", async t => {
  let config = new configUtils.Config();
  config.externalQueries = [
    new configUtils.ExternalQuery("Faten-Org/codeql-go", "df4c6869212341b601005567381944ed90906b6b"),
  ];

  await util.withTmpDir(async tmpDir => {
    process.env["RUNNER_TEMP"] = tmpDir;
    await externalQueries.checkoutExternalQueries(config);

    // COPYRIGHT file existed in df4c6869212341b601005567381944ed90906b6b but not in master
    t.true(fs.existsSync(path.join(tmpDir, "github", "codeql-go", "COPYRIGHT")));
  });
});

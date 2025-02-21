/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const settings = app.settings();

    settings.smtp.enabled = true;
    settings.smtp.host = "inbucket";
    settings.smtp.port = 2500;
    app.save(settings);

    const superUser = new Record(app.findCollectionByNameOrId("_superusers"), {
      email: "admin@pocketbase.local",
    });
    superUser.setPassword("1234567890");
    app.save(superUser);
  },
  (app) => {
    const superUser = app.findAuthRecordByEmail(
      "_superusers",
      "admin@pocketbase.local"
    );

    app.delete(superUser);
  }
);

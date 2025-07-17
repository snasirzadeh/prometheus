// Reference: https://github.com/Mileshin/Alertmanager_RocketChat_Integration/blob/master/IncomingWebHook.js
class Script {
    process_incoming_request({
        request
    }) {
        console.log(request.content);
        const resolved_emoji = " :white_check_mark: "
        const warning_emoji = " :warning: "

        var main_title = "Error: Status not found"
        if (request.content.status == "resolved") {
            main_title = resolved_emoji 
        } else if (request.content.status == "firing") {
            main_title = warning_emoji
        }

        let fields = [];
        for (i = 0; i < request.content.alerts.length; i++) {
            var alert = request.content.alerts[i];

            if (!!alert.annotations.summary) {
                fields.push({
                    title: "summary",
                    value: alert.annotations.summary
                });
            }

            if (!!alert.annotations.description) {
                fields.push({
                    title: "description",
                    value: alert.annotations.description
                });
            }

        }

        return {
            content: {
                "text": "\n**" + alert.labels.alertname + "**\n" +
                    main_title + alert.labels.instance,
                "attachments": [{
                    "collapsed": true,
                    "title": "Detail",
                    "fields": fields,
                }]
            }
        };

        return {
            error: {
                success: false
            }
        };
    }
}

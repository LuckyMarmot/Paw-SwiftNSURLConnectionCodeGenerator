// Generated by CoffeeScript 1.8.0
(function() {
  var ObjCNSURLConnectionCodeGenerator;

  require("mustache.js");

  ObjCNSURLConnectionCodeGenerator = function() {
    this.headers = function(request) {
      var header_name, header_value, headers;
      headers = request.headers;
      return {
        "has_headers": Object.keys(headers).length > 0,
        "header_list": (function() {
          var _results;
          _results = [];
          for (header_name in headers) {
            header_value = headers[header_name];
            _results.push({
              "header_name": header_name,
              "header_value": header_value
            });
          }
          return _results;
        })()
      };
    };
    this.body = function(request) {
      var json_body, name, url_encoded_body, value;
      json_body = request.jsonBody;
      if (json_body) {
        return {
          "has_json_body": true,
          "json_body_object": this.json_body_object(json_body)
        };
      }
      url_encoded_body = request.urlEncodedBody;
      if (url_encoded_body) {
        return {
          "has_url_encoded_body": true,
          "url_encoded_body": (function() {
            var _results;
            _results = [];
            for (name in url_encoded_body) {
              value = url_encoded_body[name];
              _results.push({
                "name": name,
                "value": value
              });
            }
            return _results;
          })()
        };
      }
    };
    this.json_body_object = function(object, indent) {
      var indent_str, indent_str_children, key, s, value;
      if (indent == null) {
        indent = 0;
      }
      if (object === null) {
        s = "[NSNull null]";
      } else if (typeof object === 'string') {
        s = "@\"" + object + "\"";
      } else if (typeof object === 'number') {
        s = "@" + object;
      } else if (typeof object === 'boolean') {
        s = "@" + (object ? "YES" : "NO");
      } else if (typeof object === 'object') {
        indent_str = Array(indent + 1).join('\t');
        indent_str_children = Array(indent + 2).join('\t');
        if (object.length != null) {
          s = "@[\n" + ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = object.length; _i < _len; _i++) {
              value = object[_i];
              _results.push("" + indent_str_children + (this.json_body_object(value, indent + 1)));
            }
            return _results;
          }).call(this)).join(',\n') + ("\n" + indent_str + "]");
        } else {
          s = "@{\n" + ((function() {
            var _results;
            _results = [];
            for (key in object) {
              value = object[key];
              _results.push("" + indent_str_children + "@\"" + key + "\": " + (this.json_body_object(value, indent + 1)));
            }
            return _results;
          }).call(this)).join(',\n') + ("\n" + indent_str + "}");
        }
      }
      if (indent === 0) {
        if (typeof object === 'object') {
          if (object.length != null) {
            s = "NSArray* bodyObject = " + s + ";";
          } else {
            s = "NSDictionary* bodyObject = " + s + ";";
          }
        } else {
          s = "id bodyObject = " + s + ";";
        }
      }
      return s;
    };
    this.generate = function(context) {
      var request, template, view;
      request = context.getCurrentRequest();
      view = {
        "request": context.getCurrentRequest(),
        "headers": this.headers(request),
        "body": this.body(request)
      };
      if (view.body.has_url_encoded_body) {
        view["has_utils_query_string"] = true;
      }
      template = readFile("objc.mustache");
      return Mustache.render(template, view);
    };
  };

  ObjCNSURLConnectionCodeGenerator.identifier = "com.luckymarmot.PawExtensions.ObjCNSURLConnectionCodeGenerator";

  ObjCNSURLConnectionCodeGenerator.title = "Objective-C (NSURLConnection)";

  registerCodeGenerator(ObjCNSURLConnectionCodeGenerator);

}).call(this);

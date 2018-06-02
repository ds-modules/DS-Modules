/**
Copyright (c) 2011 - 2012 George MacKerron
https://github.com/jawj/github-widget
Released under the MIT licence: http://opensource.org/licenses/mit-license

Edited by Tony Zhao (2018)
Note: Slight edit to check if repo.language is "Jupyer Notebook"
 */

(function() {
  var allPayloadData, cls, get, getNext, init, jsonp, make, makeWidget, text,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    hasProp = {}.hasOwnProperty;

  makeWidget = function(payloadData, div) {
    var j, len, limit, made, opts, ref, ref1, repo, results, siteRepoNames, sortBy, user;
    make({
      cls: 'gw-clearer',
      prevSib: div
    });
    user = div.getAttribute('data-user');
    opts = div.getAttribute('data-options');
    opts = typeof opts === 'string' ? JSON.parse(opts) : {};
    siteRepoNames = [(user + ".github.com").toLowerCase(), (user + ".github.io").toLowerCase()];
    sortBy = opts.sortBy || 'watchers';
    limit = parseInt(opts.limit) || 2e308;
    made = 0;
    ref = payloadData.sort(function(a, b) {
      return b[sortBy] - a[sortBy];
    });
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      repo = ref[j];
      if ((!opts.forks && repo.fork) || (ref1 = repo.name.toLowerCase(), indexOf.call(siteRepoNames, ref1) >= 0) || !repo.description) {
        continue;
      }
      if (made++ === limit) {
        break;
	  }
	  if (repo.language != "Jupyter Notebook"){
		  continue;
	  }
      results.push(make({
        parent: div,
        cls: 'gw-repo-outer',
        kids: [
          make({
            cls: 'gw-repo',
            kids: [
              make({
                cls: 'gw-title',
                kids: [
                  make({
                    tag: 'ul',
                    cls: 'gw-stats',
                    kids: [
                      make({
                        tag: 'li',
                        text: repo.watchers,
                        cls: 'gw-watchers'
                      }), make({
                        tag: 'li',
                        text: repo.forks,
                        cls: 'gw-forks'
                      })
                    ]
                  }), make({
                    tag: 'a',
                    href: repo.html_url,
                    text: repo.name,
                    cls: 'gw-name'
                  })
                ]
              }), repo.language != null ? make({
                cls: 'gw-lang',
                text: repo.language
              }) : void 0, make({
                cls: 'gw-repo-desc',
                text: repo.description
              })
            ]
          })
        ]
      }));
    }
    return results;
  };

  allPayloadData = [];

  init = function() {
    var div, i, j, len, ref, results;
    ref = get({
      tag: 'div',
      cls: 'github-widget'
    });
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      div = ref[i];
      results.push((function(div, i) {
        allPayloadData.push([]);
        return getNext("https://api.github.com/users/" + (div.getAttribute('data-user')) + "/repos?callback=<cb>", div, i);
      })(div, i));
    }
    return results;
  };

  getNext = function(url, div, seq) {
    return jsonp({
      url: url,
      success: function(payload) {
        var j, len, link, links;
        allPayloadData[seq] = allPayloadData[seq].concat(payload.data);
        links = payload.meta.Link;
        if (links) {
          for (j = 0, len = links.length; j < len; j++) {
            link = links[j];
            if (link[1].rel === 'next') {
              getNext(link[0], div, seq);
              return;
            }
          }
        }
        return makeWidget(allPayloadData[seq], div);
      }
    });
  };

  cls = function(el, opts) {
    var c, classHash, classes, hasClasses, j, l, len, len1, ref;
    if (opts == null) {
      opts = {};
    }
    classHash = {};
    classes = el.className.match(cls.re);
    if (classes != null) {
      for (j = 0, len = classes.length; j < len; j++) {
        c = classes[j];
        classHash[c] = true;
      }
    }
    hasClasses = (ref = opts.has) != null ? ref.match(cls.re) : void 0;
    if (hasClasses != null) {
      for (l = 0, len1 = hasClasses.length; l < len1; l++) {
        c = hasClasses[l];
        if (!classHash[c]) {
          return false;
        }
      }
      return true;
    }
    return null;
  };

  cls.re = /\S+/g;

  get = function(opts) {
    var el, els, hasCls, inside, ref, ref1, ref2, ref3, tag;
    if (opts == null) {
      opts = {};
    }
    inside = (ref = opts.inside) != null ? ref : document;
    tag = (ref1 = opts.tag) != null ? ref1 : '*';
    if (opts.id != null) {
      return inside.getElementById(opts.id);
    }
    hasCls = opts.cls != null;
    if (hasCls && tag === '*' && (inside.getElementsByClassName != null)) {
      return inside.getElementsByClassName(opts.cls);
    }
    els = inside.getElementsByTagName(tag);
    if (hasCls) {
      els = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = els.length; j < len; j++) {
          el = els[j];
          if (cls(el, {
            has: opts.cls
          })) {
            results.push(el);
          }
        }
        return results;
      })();
    }
    if ((opts.multi == null) && (ref2 = tag.toLowerCase(), indexOf.call(get.uniqueTags, ref2) >= 0)) {
      return (ref3 = els[0]) != null ? ref3 : null;
    } else {
      return els;
    }
  };

  get.uniqueTags = 'html body frameset head title base'.split(' ');

  text = function(t) {
    return document.createTextNode('' + t);
  };

  make = function(opts) {
    var c, j, k, len, ref, t, v;
    if (opts == null) {
      opts = {};
    }
    t = document.createElement((ref = opts.tag) != null ? ref : 'div');
    for (k in opts) {
      if (!hasProp.call(opts, k)) continue;
      v = opts[k];
      switch (k) {
        case 'tag':
          continue;
        case 'parent':
          v.appendChild(t);
          break;
        case 'kids':
          for (j = 0, len = v.length; j < len; j++) {
            c = v[j];
            if (c != null) {
              t.appendChild(c);
            }
          }
          break;
        case 'prevSib':
          v.parentNode.insertBefore(t, v.nextSibling);
          break;
        case 'text':
          t.appendChild(text(v));
          break;
        case 'cls':
          t.className = v;
          break;
        default:
          t[k] = v;
      }
    }
    return t;
  };

  jsonp = function(opts) {
    var callbackName, ref, ref1, url;
    callbackName = (ref = opts.callback) != null ? ref : '_JSONPCallback_' + jsonp.callbackNum++;
    url = opts.url.replace('<cb>', callbackName);
    window[callbackName] = (ref1 = opts.success) != null ? ref1 : jsonp.noop;
    return make({
      tag: 'script',
      src: url,
      parent: get({
        tag: 'head'
      })
    });
  };

  jsonp.callbackNum = 0;

  jsonp.noop = function() {};

  init();

}).call(this);

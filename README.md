# commandify [![build status](https://secure.travis-ci.org/thlorenz/commandify.png)](http://travis-ci.org/thlorenz/commandify)

Executes a command whenever the bundle is created.

### package.json

```json
{
  "browserify": {
    "transform": [ "commandify" ]
  },
  "commandify": "make all",
  "dependencies": {
    "commandify": "~0.1.0"
  }
}
```

### Or configure via JavaScript

```js
commandify.cmd = 'make hello';
commandify.dir = __dirname + '/compile';
browserify()
  .require(require.resolve('./makeify/main.js'), { entry: true })
  .bundle()
  .pipe(...);
```

### Or configure via command line

```sh
COMMANDIFY_CMD='make all' COMMANDIFY_DIR='./compile' browserify -t commandify main.js .... 
```

## Installation

    npm install commandify

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="commandify::cmd"><span class="type-signature"></span>commandify::cmd<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>The command to be executed (only needed if not defined via <code>package.json</code> config).</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js#L100">lineno 100</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="commandify::dir"><span class="type-signature"></span>commandify::dir<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>The directory in which the command is to be executed (only needed if not defined via <code>package.json</code> config).</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js#L107">lineno 107</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="commandify"><span class="type-signature"></span>commandify<span class="signature">(file)</span><span class="type-signature"> &rarr; {TransformStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>browserify transform which executes a shell command exactly once for every time the bundle is created.</p>
<p>The command can be configured</p>
<h5>inside package.json</h5>
<pre><code class="lang-json">{
&quot;browserify&quot;: {
&quot;transform&quot;: [ &quot;commandify&quot; ]
},
&quot;commandify&quot;: &quot;make all&quot;
}</code></pre>
<p>In this case the command is executed in the directory in which the <code>package.json</code> is defined.</p>
<h5>via environment variables:</h5>
<pre><code class="lang-sh">COMMANDIFY_CMD='make all' COMMANDIFY_DIR='./compile' browserify main.js ....</code></pre>
<h5>directly on commandify when bundle step is JavaScript</h5>
<pre><code class="lang-js">commandify.cmd = 'make hello';
commandify.dir = __dirname + '/compile';
browserify()
.require(require.resolve('./makeify/main.js'), { entry: true })
.bundle()
.pipe(....);</code></pre>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>file</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>file whose content is to be transformed</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/commandify/blob/master/index.js#L33">lineno 33</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>through stream</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">TransformStream</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT

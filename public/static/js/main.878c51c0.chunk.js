(this.webpackJsonpmintbean=this.webpackJsonpmintbean||[]).push([[0],{16:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"},17:function(e,t,n){},19:function(e,t,n){e.exports=n(42)},24:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(18),i=n.n(r),o=(n(24),n(2)),c=n(3),s=n(5),u=n(4),m=n(6),p=n.n(m),h=(n(16),n(17),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).handleOpenLogin=function(t){var n=t;e.setState({openLogin:n})},e.handleLogin=function(){e.handleOpenLogin(!1)},e.handleOpenPost=function(t){var n=t;e.setState({openNewPost:n})},e.handleTitle=function(t){e.setState({userTitle:t.target.value})},e.handleUrl=function(t){e.setState({userUrl:t.target.value})},e.handleDesc=function(t){e.setState({userDesc:t.target.value})},e.handlePost=function(t){t.preventDefault();var n=e.state.userTitle,a=e.state.userUrl,l=e.state.userDesc;p()({url:"https://t3minty-api.herokuapp.com/article",method:"POST",responseType:"json",data:{title:n,url:a,description:l,likes:0,comments:[]}}).then((function(t){e.props.getArticlesFunc()})),e.handleOpenPost(!1)},e.state={openLogin:!1,openNewPost:!1,userTitle:"",userUrl:"",userDesc:""},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return l.a.createElement("header",null,l.a.createElement("div",{className:"wrapper"},l.a.createElement("h1",null,"Minty news"),l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",{className:"newPost"},l.a.createElement("button",{onClick:function(){return e.handleOpenPost(!0)}},"+ New post")),l.a.createElement("li",{className:"login"},l.a.createElement("button",{onClick:function(){return e.handleOpenLogin(!0)}},"Login")))),this.state.openNewPost?l.a.createElement("div",{className:"newPost moduleContainer"},l.a.createElement("div",{className:"moduleContent"},l.a.createElement("h3",null,"Make a new post"),l.a.createElement("form",{action:"",onSubmit:this.handlePost},l.a.createElement("label",{htmlFor:"title"},"Title"),l.a.createElement("input",{type:"text",name:"title",id:"title",onChange:this.handleTitle}),l.a.createElement("label",{htmlFor:"link"},"URL"),l.a.createElement("input",{type:"text",name:"link",id:"link",onChange:this.handleUrl}),l.a.createElement("label",{htmlFor:"description"},"Description"),l.a.createElement("textarea",{name:"description",id:"description",cols:"30",rows:"10",onChange:this.handleDesc}),l.a.createElement("button",{type:"submit"},"Post")))):null,this.state.openLogin?l.a.createElement("div",{className:"login moduleContainer"},l.a.createElement("div",{className:"moduleContent"},l.a.createElement("h3",null,"Login"),l.a.createElement("form",{action:"",onSubmit:this.handleLogin},l.a.createElement("label",{htmlFor:"username"},"Username"),l.a.createElement("input",{type:"text",name:"username",id:"username"}),l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",name:"password",id:"password"}),l.a.createElement("button",{type:"submit"},"Log in")))):null))}}]),n}(a.Component)),d=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.call(this)}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.props.getArticlesFunc()}},{key:"render",value:function(){return l.a.createElement("main",null,l.a.createElement("div",{className:"wrapper"},l.a.createElement("ul",null,this.props.articleData.map((function(e){return l.a.createElement("li",{key:e._id},l.a.createElement("button",null,"Like"),l.a.createElement("h2",null,l.a.createElement("a",{href:e.url},e.title)),l.a.createElement("p",null,e.description),l.a.createElement("p",null,e.likes),l.a.createElement("p",null,e.date))})))))}}]),n}(a.Component),E=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).getArticles=function(){p()({url:"https://t3minty-api.herokuapp.com/articles",method:"GET",responseType:"json"}).then((function(t){var n=t.data;e.setState({articles:n})}))},e.state={isLoggedIn:!1,articles:[]},e}return Object(c.a)(n,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(h,{loggedIn:this.state.openLogin,getArticlesFunc:this.getArticles}),l.a.createElement(d,{getArticlesFunc:this.getArticles,articleData:this.state.articles}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.878c51c0.chunk.js.map
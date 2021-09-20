(this.webpackJsonpinfiltrometer21=this.webpackJsonpinfiltrometer21||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),o=n(13),a=n.n(o),c=(n(32),n(33),n(8)),u=n(2),s=n(9),l=n(5),p=Object(l.c)({name:"baerResults",initialState:{reports:[],curId:-1},reducers:{newReport:function(e,t){e.curId++,e.reports.push({id:e.curId,date:t.payload.date,protocol:t.payload.protocol,readings:[],infiltrometerData:t.payload.infiltrometerData})},addReading:function(e,t){e.reports[t.payload.id].readings.push(t.payload.reading)}}}),d=p.actions.newReport,f=function(e){return e.reports},h=p.reducer,j="BAER_PROTOCOL",b={initialVolume:0,coordinates:{lat:0,long:0},soilType:{nh0:0,alpha:0},infiltrometerRadius:0,timeInterval:30},v=Object(l.c)({name:"baerInitialize",initialState:b,reducers:{setInfiltrometerType:function(e,t){t.payload.infiltrometerType,e.infiltrometerR=0},setInitialVolume:function(e,t){e.initialVolume=t.payload.initialVolume}}}),m=v.reducer,x=n(1),O=function(){var e=Object(s.b)();return Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{onClick:function(){e(d({protocol:j,date:(new Date).toString(),infiltrometerData:0}))},children:"Add new Baer Report"}),Object(x.jsx)("div",{children:"Bear Initialize View"}),Object(x.jsx)(c.b,{to:"/Infiltrometer/baer-replication",children:"To Replication View"})]})},g=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{children:"Bear Replication View"}),Object(x.jsx)(c.b,{to:"/Infiltrometer/baer-results",children:"To Results View"})]})},w=function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{children:"Bear Results View"}),Object(x.jsx)(c.b,{to:"/Infiltrometer/baer-initialize",children:"To Initialize View"})]})};function y(){var e=Object(s.c)(f);return Object(x.jsx)("div",{children:Object(x.jsx)("button",{onClick:function(){return console.log(e)},children:"Show Reports in Store"})})}n(14),n(12);var M=n(22);function I(e,t){var n=[],r=[];e.forEach((function(e,i){null!==e[1]&&(r.push(e),n.push(t[i]))}));var i=r.reduce((function(e,t){return e+t[1]}),0)/r.length,o=r.reduce((function(e,t){var n=t[1]-i;return e+n*n}),0);return 1-r.reduce((function(e,t,r){var i=n[r],o=t[1]-i[1];return e+o*o}),0)/o}function R(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}var V={linear:function(e,t){for(var n=[0,0,0,0,0],r=0,i=0;i<e.length;i++)null!==e[i][1]&&(r++,n[0]+=e[i][0],n[1]+=e[i][1],n[2]+=e[i][0]*e[i][0],n[3]+=e[i][0]*e[i][1],n[4]+=e[i][1]*e[i][1]);var o=r*n[2]-n[0]*n[0],a=r*n[3]-n[0]*n[1],c=0===o?0:R(a/o,t.precision),u=R(n[1]/r-c*n[0]/r,t.precision),s=function(e){return[R(e,t.precision),R(c*e+u,t.precision)]},l=e.map((function(e){return s(e[0])}));return{points:l,predict:s,equation:[c,u],r2:R(I(e,l),t.precision),string:0===u?"y = ".concat(c,"x"):"y = ".concat(c,"x + ").concat(u)}},exponential:function(e,t){for(var n=[0,0,0,0,0,0],r=0;r<e.length;r++)null!==e[r][1]&&(n[0]+=e[r][0],n[1]+=e[r][1],n[2]+=e[r][0]*e[r][0]*e[r][1],n[3]+=e[r][1]*Math.log(e[r][1]),n[4]+=e[r][0]*e[r][1]*Math.log(e[r][1]),n[5]+=e[r][0]*e[r][1]);var i=n[1]*n[2]-n[5]*n[5],o=Math.exp((n[2]*n[3]-n[5]*n[4])/i),a=(n[1]*n[4]-n[5]*n[3])/i,c=R(o,t.precision),u=R(a,t.precision),s=function(e){return[R(e,t.precision),R(c*Math.exp(u*e),t.precision)]},l=e.map((function(e){return s(e[0])}));return{points:l,predict:s,equation:[c,u],string:"y = ".concat(c,"e^(").concat(u,"x)"),r2:R(I(e,l),t.precision)}},logarithmic:function(e,t){for(var n=[0,0,0,0],r=e.length,i=0;i<r;i++)null!==e[i][1]&&(n[0]+=Math.log(e[i][0]),n[1]+=e[i][1]*Math.log(e[i][0]),n[2]+=e[i][1],n[3]+=Math.pow(Math.log(e[i][0]),2));var o=R((r*n[1]-n[2]*n[0])/(r*n[3]-n[0]*n[0]),t.precision),a=R((n[2]-o*n[0])/r,t.precision),c=function(e){return[R(e,t.precision),R(R(a+o*Math.log(e),t.precision),t.precision)]},u=e.map((function(e){return c(e[0])}));return{points:u,predict:c,equation:[a,o],string:"y = ".concat(a," + ").concat(o," ln(x)"),r2:R(I(e,u),t.precision)}},power:function(e,t){for(var n=[0,0,0,0,0],r=e.length,i=0;i<r;i++)null!==e[i][1]&&(n[0]+=Math.log(e[i][0]),n[1]+=Math.log(e[i][1])*Math.log(e[i][0]),n[2]+=Math.log(e[i][1]),n[3]+=Math.pow(Math.log(e[i][0]),2));var o=(r*n[1]-n[0]*n[2])/(r*n[3]-Math.pow(n[0],2)),a=(n[2]-o*n[0])/r,c=R(Math.exp(a),t.precision),u=R(o,t.precision),s=function(e){return[R(e,t.precision),R(R(c*Math.pow(e,u),t.precision),t.precision)]},l=e.map((function(e){return s(e[0])}));return{points:l,predict:s,equation:[c,u],string:"y = ".concat(c,"x^").concat(u),r2:R(I(e,l),t.precision)}},polynomial:function(e,t){for(var n=[],r=[],i=0,o=0,a=e.length,c=t.order+1,u=1;u<c;u++){for(var s=0;s<a;s++)null!==e[s][1]&&(i+=Math.pow(e[s][0],u)*e[s][1]);n.push(i),i=0;for(var l=[],p=1;p<c;p++){for(var d=0;d<a;d++)null!==e[d][1]&&(o+=Math.pow(e[d][0],u+p));l.push(o),o=0}r.push(l)}r.push(n);for(var f=[0].concat(Object(M.a)(function(e,t){for(var n=e,r=e.length-1,i=[t],o=0;o<r;o++){for(var a=o,c=o+1;c<r;c++)Math.abs(n[o][c])>Math.abs(n[o][a])&&(a=c);for(var u=o;u<r+1;u++){var s=n[u][o];n[u][o]=n[u][a],n[u][a]=s}for(var l=o+1;l<r;l++)for(var p=r;p>=o;p--)n[p][l]-=n[p][o]*n[o][l]/n[o][o]}for(var d=r-1;d>=0;d--){for(var f=0,h=d+1;h<r;h++)f+=n[h][d]*i[h];i[d]=(n[r][d]-f)/n[d][d]}return i}(r,c).map((function(e){return R(e,t.precision)})))),h=function(e){return[R(e,t.precision),R(f.reduce((function(t,n,r){return t+n*Math.pow(e,r)}),0),t.precision)]},j=e.map((function(e){return h(e[0])})),b="y = ",v=f.length-1;v>=0;v--)b+=v>1?"".concat(f[v],"x^").concat(v," + "):1===v?"".concat(f[v],"x + "):f[v];return{string:b,points:j,predict:h,equation:Object(M.a)(f).reverse(),r2:R(I(e,j),t.precision)}}};function B(){var e={value:"",results:{}};return Object(x.jsxs)("div",{children:[Object(x.jsx)("form",{children:Object(x.jsxs)("label",{children:["Data Points: ",e.value,Object(x.jsx)("input",{type:"text",onChange:function(t){e.value=t.target.value}})]})}),Object(x.jsx)("div",{children:Object(x.jsx)("button",{onClick:function(t){for(var n=e.value.split(" "),r=0;r<n.length;r++)n[r]=n[r].split(",");e.results=V.polynomial(n,{order:2,precision:15}),alert("Points were submitted: "+n+"\nRegression output: "+e.results.string),console.log(e.results)},children:"Submit For Regression"})})]})}var S=function(){return Object(x.jsxs)(c.a,{children:[Object(x.jsx)(y,{}),Object(x.jsxs)(u.c,{children:[Object(x.jsx)(u.a,{exact:!0,path:"/Infiltrometer/",children:Object(x.jsx)("div",{children:Object(x.jsx)(c.b,{to:"/Infiltrometer/baer-initialize",children:"Baer Initialize View"})})}),Object(x.jsx)(u.a,{exact:!0,path:"/Infiltrometer/baer-initialize",children:Object(x.jsx)(O,{})}),Object(x.jsx)(u.a,{exact:!0,path:"/Infiltrometer/baer-replication",children:Object(x.jsx)(g,{})}),Object(x.jsx)(u.a,{exact:!0,path:"/Infiltrometer/baer-results",children:Object(x.jsx)(w,{})}),Object(x.jsx)(u.a,{exact:!0,path:"/Infiltrometer/testing/regression",children:Object(x.jsx)(B,{})})]})]})},k=n(21),z=n.n(k),C=n(27);function T(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var q=Object(l.b)("counter/fetchCount",function(){var e=Object(C.a)(z.a.mark((function e(t){var n;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D=Object(l.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(q.pending,(function(e){e.status="loading"})).addCase(q.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),A=D.actions,P=(A.increment,A.decrement,A.incrementByAmount,D.reducer),E=(n(45),Object(l.c)({name:"baerReplication",initialState:{},reducers:{}}).reducer),J=Object(l.c)({name:"baerResults",initialState:{},reducers:{}}).reducer,W=Object(l.a)({reducer:{baerInitialize:m,baerReplication:E,baerResults:J,counter:P,reports:h}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(s.a,{store:W,children:Object(x.jsx)(S,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[50,1,2]]]);
//# sourceMappingURL=main.92fd6b20.chunk.js.map
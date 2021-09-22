(this.webpackJsonpinfiltrometer21=this.webpackJsonpinfiltrometer21||[]).push([[0],{32:function(e,t,r){},33:function(e,t,r){},51:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),c=r(14),o=r.n(c),a=(r(32),r(33),r(9)),l=r(2),s=r(8),u=r(11),d=r(5),p=Object(d.c)({name:"baerResults",initialState:{reports:[],curId:-1},reducers:{newReport:function(e,t){e.curId++,e.reports=[].concat(Object(u.a)(e.reports),[{id:e.curId,date:t.payload.date,protocol:t.payload.protocol,readings:[],infiltrometerData:t.payload.infiltrometerData}])},addReading:function(e,t){e.reports[e.curId].readings=[].concat(Object(u.a)(e.reports[e.curId].readings),[t.payload.reading])}}}),j=p.actions,b=j.newReport,h=j.addReading,f=function(e){return e.reports},m=p.reducer,v="BAER_PROTOCOL",x={initialVolume:0,coordinates:{lat:0,long:0},soilType:{nh0:0,alpha:0},infiltrometerRadius:0,timeInterval:30},O=Object(d.c)({name:"baerInitialize",initialState:x,reducers:{setInfiltrometerType:function(e,t){t.payload.infiltrometerType,e.infiltrometerR=0},setInitialVolume:function(e,t){e.initialVolume=t.payload.initialVolume}}}),g=O.reducer,y=r(1),w=function(){var e=Object(s.b)();return Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{children:[Object(y.jsx)("h1",{children:"Initialize Baer Protocol"}),Object(y.jsx)(a.b,{to:"/Infiltrometer/baer-replication",children:"To Replication View"})]}),Object(y.jsx)("div",{}),Object(y.jsxs)("div",{class:"form-group row",children:[Object(y.jsx)("label",{for:"inputVolume",class:"col-sm-2 col-form-label",children:"Initial Volume"}),Object(y.jsx)("div",{class:"col-sm-10",children:Object(y.jsx)("input",{type:"number",class:"form-control",id:"inputVolume",placeholder:"Enter Volume"})})]}),Object(y.jsxs)("div",{class:"form-group row",children:[Object(y.jsx)("label",{for:"inputSuction",class:"col-sm-2 col-form-label",children:"Suction"}),Object(y.jsx)("div",{class:"col-sm-10",children:Object(y.jsx)("input",{type:"number",class:"form-control",id:"inputSuction",placeholder:"Enter Suction"})})]}),Object(y.jsxs)("div",{class:"form-group row",children:[Object(y.jsx)("label",{for:"inputTimeInterval",class:"col-sm-2 col-form-label",children:"Time Interval"}),Object(y.jsx)("div",{class:"col-sm-10",children:Object(y.jsx)("input",{type:"number",class:"form-control",id:"inputTimeInterval",placeholder:"Enter Time Interval"})})]}),Object(y.jsx)("fieldset",{class:"form-group",children:Object(y.jsxs)("div",{class:"row",children:[Object(y.jsx)("legend",{class:"col-form-label col-sm-2 pt-0",children:"Soil Type"}),Object(y.jsxs)("div",{class:"col-sm-10",children:[Object(y.jsxs)("div",{class:"form-check",children:[Object(y.jsx)("input",{class:"form-check-input",type:"radio",name:"gridRadios",id:"clayRadio",value:"option1",checked:!0}),Object(y.jsx)("label",{class:"form-check-label",for:"clayRadio",children:"Clay"})]}),Object(y.jsxs)("div",{class:"form-check",children:[Object(y.jsx)("input",{class:"form-check-input",type:"radio",name:"gridRadios",id:"loamRadio",value:"option2"}),Object(y.jsx)("label",{class:"form-check-label",for:"loamRadio",children:"Loam"})]}),Object(y.jsxs)("div",{class:"form-check",children:[Object(y.jsx)("input",{class:"form-check-input",type:"radio",name:"gridRadios",id:"clayLoamRadio",value:"option3"}),Object(y.jsx)("label",{class:"form-check-label",for:"clayLoamRadio",children:"Clay Loam"})]}),Object(y.jsxs)("div",{class:"form-check",children:[Object(y.jsx)("input",{class:"form-check-input",type:"radio",name:"gridRadios",id:"customRadio",value:"option4"}),Object(y.jsx)("label",{class:"form-check-label",for:"customRadio",children:"Custom"})]})]})]})}),Object(y.jsx)("div",{class:"form-group row",children:Object(y.jsx)("div",{class:"col-sm-10",children:Object(y.jsx)("button",{type:"submit",class:"btn btn-primary",onClick:function(){e(b({protocol:v,date:(new Date).toString(),infiltrometerData:0}))},children:"Start Protocol"})})})]})},R=(r(44),Object(d.c)({name:"baerReplication",initialState:{volume:0,secondsElapsed:0},reducers:{setVolume:function(e,t){e.volume=t.payload.volume},setSecondsElapsed:function(e,t){e.secondsElapsed=t.payload.secondsElapsed}}})),I=function(e){return e.baerReplication},M=R.reducer,k=function(){var e=Object(s.c)(I),t=Object(s.b)();return Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{children:[Object(y.jsx)("button",{onClick:function(){return t(h({reading:e}))},children:"Add Reading"}),"Bear Replication View"]}),Object(y.jsx)(a.b,{to:"/Infiltrometer/baer-results",children:"To Results View"})]})},S=function(){return Object(y.jsxs)("div",{children:[Object(y.jsx)("div",{children:"Bear Results View"}),Object(y.jsx)(a.b,{to:"/Infiltrometer/baer-initialize",children:"To Initialize View"})]})};function V(){var e=Object(s.c)(f);return Object(y.jsx)("div",{children:Object(y.jsx)("button",{onClick:function(){return console.log(e)},children:"Show Reports in Store"})})}r(15),r(13);function T(e,t){var r=[],n=[];e.forEach((function(e,i){null!==e[1]&&(n.push(e),r.push(t[i]))}));var i=n.reduce((function(e,t){return e+t[1]}),0)/n.length,c=n.reduce((function(e,t){var r=t[1]-i;return e+r*r}),0);return 1-n.reduce((function(e,t,n){var i=r[n],c=t[1]-i[1];return e+c*c}),0)/c}function C(e,t){var r=Math.pow(10,t);return Math.round(e*r)/r}var E={linear:function(e,t){for(var r=[0,0,0,0,0],n=0,i=0;i<e.length;i++)null!==e[i][1]&&(n++,r[0]+=e[i][0],r[1]+=e[i][1],r[2]+=e[i][0]*e[i][0],r[3]+=e[i][0]*e[i][1],r[4]+=e[i][1]*e[i][1]);var c=n*r[2]-r[0]*r[0],o=n*r[3]-r[0]*r[1],a=0===c?0:C(o/c,t.precision),l=C(r[1]/n-a*r[0]/n,t.precision),s=function(e){return[C(e,t.precision),C(a*e+l,t.precision)]},u=e.map((function(e){return s(e[0])}));return{points:u,predict:s,equation:[a,l],r2:C(T(e,u),t.precision),string:0===l?"y = ".concat(a,"x"):"y = ".concat(a,"x + ").concat(l)}},exponential:function(e,t){for(var r=[0,0,0,0,0,0],n=0;n<e.length;n++)null!==e[n][1]&&(r[0]+=e[n][0],r[1]+=e[n][1],r[2]+=e[n][0]*e[n][0]*e[n][1],r[3]+=e[n][1]*Math.log(e[n][1]),r[4]+=e[n][0]*e[n][1]*Math.log(e[n][1]),r[5]+=e[n][0]*e[n][1]);var i=r[1]*r[2]-r[5]*r[5],c=Math.exp((r[2]*r[3]-r[5]*r[4])/i),o=(r[1]*r[4]-r[5]*r[3])/i,a=C(c,t.precision),l=C(o,t.precision),s=function(e){return[C(e,t.precision),C(a*Math.exp(l*e),t.precision)]},u=e.map((function(e){return s(e[0])}));return{points:u,predict:s,equation:[a,l],string:"y = ".concat(a,"e^(").concat(l,"x)"),r2:C(T(e,u),t.precision)}},logarithmic:function(e,t){for(var r=[0,0,0,0],n=e.length,i=0;i<n;i++)null!==e[i][1]&&(r[0]+=Math.log(e[i][0]),r[1]+=e[i][1]*Math.log(e[i][0]),r[2]+=e[i][1],r[3]+=Math.pow(Math.log(e[i][0]),2));var c=C((n*r[1]-r[2]*r[0])/(n*r[3]-r[0]*r[0]),t.precision),o=C((r[2]-c*r[0])/n,t.precision),a=function(e){return[C(e,t.precision),C(C(o+c*Math.log(e),t.precision),t.precision)]},l=e.map((function(e){return a(e[0])}));return{points:l,predict:a,equation:[o,c],string:"y = ".concat(o," + ").concat(c," ln(x)"),r2:C(T(e,l),t.precision)}},power:function(e,t){for(var r=[0,0,0,0,0],n=e.length,i=0;i<n;i++)null!==e[i][1]&&(r[0]+=Math.log(e[i][0]),r[1]+=Math.log(e[i][1])*Math.log(e[i][0]),r[2]+=Math.log(e[i][1]),r[3]+=Math.pow(Math.log(e[i][0]),2));var c=(n*r[1]-r[0]*r[2])/(n*r[3]-Math.pow(r[0],2)),o=(r[2]-c*r[0])/n,a=C(Math.exp(o),t.precision),l=C(c,t.precision),s=function(e){return[C(e,t.precision),C(C(a*Math.pow(e,l),t.precision),t.precision)]},u=e.map((function(e){return s(e[0])}));return{points:u,predict:s,equation:[a,l],string:"y = ".concat(a,"x^").concat(l),r2:C(T(e,u),t.precision)}},polynomial:function(e,t){for(var r=[],n=[],i=0,c=0,o=e.length,a=t.order+1,l=1;l<a;l++){for(var s=0;s<o;s++)null!==e[s][1]&&(i+=Math.pow(e[s][0],l)*e[s][1]);r.push(i),i=0;for(var d=[],p=1;p<a;p++){for(var j=0;j<o;j++)null!==e[j][1]&&(c+=Math.pow(e[j][0],l+p));d.push(c),c=0}n.push(d)}n.push(r);for(var b=[0].concat(Object(u.a)(function(e,t){for(var r=e,n=e.length-1,i=[t],c=0;c<n;c++){for(var o=c,a=c+1;a<n;a++)Math.abs(r[c][a])>Math.abs(r[c][o])&&(o=a);for(var l=c;l<n+1;l++){var s=r[l][c];r[l][c]=r[l][o],r[l][o]=s}for(var u=c+1;u<n;u++)for(var d=n;d>=c;d--)r[d][u]-=r[d][c]*r[c][u]/r[c][c]}for(var p=n-1;p>=0;p--){for(var j=0,b=p+1;b<n;b++)j+=r[b][p]*i[b];i[p]=(r[n][p]-j)/r[p][p]}return i}(n,a).map((function(e){return C(e,t.precision)})))),h=function(e){return[C(e,t.precision),C(b.reduce((function(t,r,n){return t+r*Math.pow(e,n)}),0),t.precision)]},f=e.map((function(e){return h(e[0])})),m="y = ",v=b.length-1;v>=0;v--)m+=v>1?"".concat(b[v],"x^").concat(v," + "):1===v?"".concat(b[v],"x + "):b[v];return{string:m,points:f,predict:h,equation:Object(u.a)(b).reverse(),r2:C(T(e,f),t.precision)}}};function B(){var e={value:"",results:{}};return Object(y.jsxs)("div",{children:[Object(y.jsx)("form",{children:Object(y.jsxs)("label",{children:["Data Points: ",e.value,Object(y.jsx)("input",{type:"text",onChange:function(t){e.value=t.target.value}})]})}),Object(y.jsx)("div",{children:Object(y.jsx)("button",{onClick:function(t){for(var r=e.value.split(" "),n=0;n<r.length;n++)r[n]=r[n].split(",");e.results=E.polynomial(r,{order:2,precision:15}),alert("Points were submitted: "+r+"\nRegression output: "+e.results.string),console.log(e.results)},children:"Submit For Regression"})})]})}var z=function(){return Object(y.jsxs)(a.a,{children:[Object(y.jsx)(V,{}),Object(y.jsxs)(l.c,{children:[Object(y.jsx)(l.a,{exact:!0,path:"/Infiltrometer/",children:Object(y.jsx)("div",{children:Object(y.jsx)(a.b,{to:"/Infiltrometer/baer-initialize",children:"Baer Initialize View"})})}),Object(y.jsx)(l.a,{exact:!0,path:"/Infiltrometer/baer-initialize",children:Object(y.jsx)(w,{})}),Object(y.jsx)(l.a,{exact:!0,path:"/Infiltrometer/baer-replication",children:Object(y.jsx)(k,{})}),Object(y.jsx)(l.a,{exact:!0,path:"/Infiltrometer/baer-results",children:Object(y.jsx)(S,{})}),Object(y.jsx)(l.a,{exact:!0,path:"/Infiltrometer/testing/regression",children:Object(y.jsx)(B,{})})]})]})},P=r(22),q=r.n(P),D=r(27);function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var A=Object(d.b)("counter/fetchCount",function(){var e=Object(D.a)(q.a.mark((function e(t){var r;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L(t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),J=Object(d.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(A.pending,(function(e){e.status="loading"})).addCase(A.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),W=J.actions,F=(W.increment,W.decrement,W.incrementByAmount,J.reducer),$=Object(d.c)({name:"baerResults",initialState:{},reducers:{}}).reducer,_=Object(d.a)({reducer:{baerInitialize:g,baerReplication:M,baerResults:$,counter:F,reports:m}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(50);o.a.render(Object(y.jsx)(i.a.StrictMode,{children:Object(y.jsx)(s.a,{store:_,children:Object(y.jsx)(z,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[51,1,2]]]);
//# sourceMappingURL=main.179214f8.chunk.js.map
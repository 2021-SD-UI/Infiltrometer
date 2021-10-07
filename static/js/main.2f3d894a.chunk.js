(this.webpackJsonpinfiltrometer21=this.webpackJsonpinfiltrometer21||[]).push([[0],{140:function(e,t,n){},141:function(e,t,n){},247:function(e,t,n){},254:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),i=n(22),a=n.n(i),s=(n(140),n(141),n(53)),l=n(12),o=n(24),u=n(9),d=n(49),j=n(18),b=Object(j.c)({name:"reports",initialState:{reports:[],curId:-1},reducers:{newReport:function(e,t){e.curId++,e.reports=[].concat(Object(d.a)(e.reports),[{id:e.curId,date:t.payload.date,protocol:t.payload.protocol,readings:[],infiltrometerData:t.payload.infiltrometerData,gatheringData:!0}])},addReading:function(e,t){e.reports[e.curId].readings=[].concat(Object(d.a)(e.reports[e.curId].readings),[t.payload])},setGatheringData:function(e,t){e.reports[e.curId].gatheringData=t.payload}}}),m=b.actions,h=m.newReport,p=m.addReading,O=m.setGatheringData,f=function(e){return e.reports.reports},x=function(e){return e.reports.curId},v=function(e){return e.reports.reports[e.reports.curId].readings.length-1},g=b.reducer,y="BAER_PROTOCOL",I={nh0:1.09,alpha:.005},w={nh0:1.31,alpha:1.31},S={nh0:1.56,alpha:.036},N={alpha:.145,nh0:2.68},R={alpha:.027,nh0:1.23},k={alpha:.124,nh0:2.28},M={alpha:.075,nh0:1.89},T={alpha:.016,nh0:1.37},C={alpha:.02,nh0:1.41},V={alpha:.005,nh0:1.09},E={alpha:.01,nh0:1.23},D=Object(j.c)({name:"baerInitialize",initialState:{initialVolume:0,coordinates:{lat:0,long:0},soilType:{nh0:0,alpha:0},infiltrometerRadius:0,infiltrometerSuction:0,timeInterval:30},reducers:{setInitialVolume:function(e,t){e.initialVolume=t.payload},setInfiltrometerSuction:function(e,t){e.infiltrometerSuction=t.payload},setTimeInterval:function(e,t){e.timeInterval=t.payload},setSoilType:function(e,t){e.soilType=t.payload},setInfiltrometerData:function(e,t){e.initialVolume=t.payload.initialVolume,e.coordinates=t.payload.coordinates,e.soilType=t.payload.soilType,e.timeInterval=t.payload.timeInterval,e.infiltrometerRadius=t.payload.infiltrometerRadius,e.infiltrometerSuction=t.payload.infiltrometerSuction}}}),P=function(e){return e.baerInitialize.soilType},L=function(e){return e.baerInitialize.initialVolume},A=function(e){return e.baerInitialize},q=function(e){return e.baerInitialize.timeInterval},U=D.actions,z=(U.setInitialVolume,U.setInfiltrometerSuction,U.setTimeInterval,U.setSoilType),B=U.setInfiltrometerData,G=D.reducer,F=Object(j.c)({name:"baerReplication",initialState:{volume:0,secondsElapsed:0,lastVolume:0},reducers:{setVolume:function(e,t){e.volume=Number(t.payload)},setSecondsElapsed:function(e,t){e.secondsElapsed=Number(t.payload)},setLastVolume:function(e,t){e.lastVolume=Number(t.payload)}}}),H=F.actions,W=H.setVolume,J=H.setSecondsElapsed,Y=H.setLastVolume,$=function(e){return e.baerReplication.lastVolume},_=F.reducer,K=n(266),Q=n(264),X=Object(j.c)({name:"redirector",initialState:{page:null},reducers:{setPage:function(e,t){e.page=t.payload}}}),Z=X.actions.setPage,ee=function(e){return e.redirector.page},te=X.reducer,ne=n(265),re=n(133),ce=n(260),ie=n(29),ae={radius:2.25,displayName:"Mini Disk"},se={radius:1.6,displayName:"Mini Disk Version 1"},le=n(1),oe=function(e){var t=e.input,n=e.label,r=e.type,c=e.meta,i=c.touched,a=c.error;return Object(le.jsx)("div",{children:Object(le.jsxs)("div",{children:[Object(le.jsx)("input",Object(o.a)(Object(o.a)({},t),{},{placeholder:n,type:r})),i&&a&&Object(le.jsx)("span",{children:a})]})})},ue=Object(u.b)()(Object(Q.a)({form:"baerInitializeForm",validate:function(e){var t={};return e.volume?e.volume<0&&(t.volume="Must be a value greater than zero"):t.volume="Required",e.suction?Number(e.suction)>=0&&(t.suction="Must be a negative value"):t.suction="Required",e.timeInterval?Number(e.timeInterval)<=0&&(t.timeInterval="Time interval must be greater than 0"):t.timeInterval="Required",e.radius?Number(e.radius)<=0&&(t.radius="Radius must be larger than 0"):t.radius="Required",e.nh0?Number(e.nh0)<0&&(t.nh0="Must be a positive number"):t.nh0="Required",e.alpha?Number(e.alpha)<0&&(t.alpha="Must be a positive number"):t.alpha="Required",t},onSubmit:function(e,t){var n={initialVolume:Number(e.volume),coordinates:{lat:0,long:0},soilType:{nh0:e.nh0,alpha:e.alpha},infiltrometerRadius:e.radius,timeInterval:Number(e.timeInterval),infiltrometerSuction:Number(e.suction)};t(B(n)),t(Y(n.initialVolume)),t(h({date:(new Date).toString(),protocol:y,infiltrometerData:n})),t(p({volume:Number(e.volume),secondsElapsed:0})),t(Z("/Infiltrometer/baer-replication"))}})((function(e){Object(u.d)(A);var t=e.change,n=(e.soilTypeSelected,e.handleSubmit),c=e.pristine,i=e.reset,a=e.submitting,s=(e.soilValues,Object(u.d)(P)),l=Object(u.d)(A),o=Object(u.c)(),d=function(e){e&&(t("nh0",e.nh0),t("alpha",e.alpha),o(z({nh0:e.nh0,alpha:e.alpha})))},j=function(e){t("radius",e.radius)};return Object(r.useEffect)((function(){0!=l.infiltrometerRadius&&(t("radius",l.infiltrometerRadius),t("nh0",s.nh0),t("alpha",s.alpha),t("volume",l.initialVolume),t("suction",l.infiltrometerSuction),t("timeInterval",l.timeInterval))}),[]),Object(le.jsx)("div",{class:"container mt-5",children:Object(le.jsx)("div",{class:"row",children:Object(le.jsx)("div",{class:"col-12 bg-light rounded border shadow",children:Object(le.jsxs)(ne.a,{onSubmit:n,expand:"lg",bg:"dark",variant:"dark",children:[Object(le.jsxs)("div",{class:"form-group row pt-4",children:[Object(le.jsx)("div",{class:"col-4"}),Object(le.jsx)("label",{for:"volume",class:"col-sm-2 col-form-label align-content-center fw-bolder",children:"Initial Volume (mL)"}),Object(le.jsx)("div",{class:"col-sm-2",children:Object(le.jsx)(K.a,{name:"volume",type:"number",component:oe,label:"Initial Volume"})}),Object(le.jsx)("div",{class:"col-4"})]}),Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)("div",{className:"col-4"}),Object(le.jsx)(re.a,{for:"suction",class:"col-sm-2 col-form-label fw-bolder",children:"Suction (cm)"}),Object(le.jsx)("div",{class:"col-sm-2",children:Object(le.jsx)(K.a,{name:"suction",type:"number",component:oe,label:"Suction"})}),Object(le.jsx)("div",{className:"col-4"})]}),Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)("div",{className:"col-4"}),Object(le.jsx)(re.a,{for:"timeInterval",class:"col-sm-2 col-form-label fw-bolder",children:"Time Interval (sec)"}),Object(le.jsx)("div",{class:"col-sm-2",children:Object(le.jsx)(K.a,{name:"timeInterval",type:"number",component:oe,label:"Time Interval"})}),Object(le.jsx)("div",{className:"col-4"})]}),Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)("div",{className:"col-4"}),Object(le.jsx)(re.a,{for:"radius",class:"col-sm-2 col-form-label fw-bolder",children:"Radius (cm)"}),Object(le.jsxs)("div",{class:"form-group col-sm-2",children:[Object(le.jsx)("div",{className:"col-4"}),Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)("div",{class:"col-sm-10",children:Object(le.jsxs)(ce.a,{title:"Preset Infiltrometer Types",component:"select",bg:"dark",variant:"dark",children:[Object(le.jsx)(ie.a.Item,{onSelect:function(){return j(ae)},children:ae.displayName}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return j(se)},children:se.displayName})]})}),Object(le.jsx)(K.a,{name:"radius",type:"number",component:oe,label:"Radius"})]})]})]}),Object(le.jsxs)("div",{class:"row pt-2",children:[Object(le.jsx)("div",{className:"col-4"}),Object(le.jsx)("label",{for:"soilType",class:"col-sm-2 col-form-label fw-bolder",children:"Soil Type"}),Object(le.jsx)("div",{class:"col-sm-2",children:Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)("div",{class:"col-sm-10",children:Object(le.jsxs)(ce.a,{title:"Preset Soil Types",component:"select",bg:"dark",variant:"dark",children:[Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(I)},children:"Clay"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(w)},children:"Clay Loam"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(S)},children:"Loam"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(k)},children:"Loamy Sand"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(N)},children:"Sand"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(R)},children:"Sandy Clay"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(M)},children:"Sandy Loam"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(T)},children:"Silt"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(C)},children:"Silt Loam"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(V)},children:"Silty Clay"}),Object(le.jsx)(ie.a.Item,{onSelect:function(){return d(E)},children:"Silty Clay Loam"})]})}),Object(le.jsxs)("div",{class:"col-sm-10",children:[Object(le.jsx)(re.a,{for:"nh0",class:"row",children:"(NH/O)"}),Object(le.jsx)(K.a,{name:"nh0",component:oe,type:"number",value:"nh0",label:"NH0"})]}),Object(le.jsxs)("div",{class:"form-group row",children:[Object(le.jsx)(re.a,{for:"alpha",class:"row",children:"(Alpha)"}),Object(le.jsx)(K.a,{name:"alpha",component:oe,type:"number",value:"alpha",label:"Alpha"})]})]})}),Object(le.jsx)("div",{className:"col-4"})]}),Object(le.jsxs)("div",{class:"form-group row pt-4 ",children:[Object(le.jsx)("div",{class:"col-4"}),Object(le.jsx)("div",{class:"col-sm-4",children:Object(le.jsx)("button",{class:"btn btn-dark w-100",type:"submit",disabled:a,children:"Start Protocol"})}),Object(le.jsx)("div",{class:"col-4"})]}),Object(le.jsxs)("div",{class:"form-group row pb-4",children:[Object(le.jsx)("div",{class:"col-4"}),Object(le.jsx)("div",{class:"col-sm-4",children:Object(le.jsx)("button",{type:"button",class:"btn btn-secondary w-100",disabled:c||a,onClick:i,children:"Clear Values"})}),Object(le.jsx)("div",{className:"col-4"})]})]})})})})}))),de=n(47),je=n(129),be=(n(247),{min:0,max:3}),me={min:3,max:8},he={min:8,max:1/0},pe=function(){var e,t=Object(u.d)(f)[Object(u.d)(x)],n=Object(r.useState)(l()),c=Object(de.a)(n,2),i=c[0];c[1];function a(e){return e>0?(t.readings[e-1].volume-t.readings[e].volume)/((t.readings[e].secondsElapsed-t.readings[e-1].secondsElapsed)/60):0}function s(){for(var e=0,n=0;n<t.readings.length;n++)e+=a(n);return e/(t.readings.length-1)}function l(){for(var e=[],n=0;n<t.readings.length;n++)e[n]={id:n,Time:t.readings[n].secondsElapsed,Volume:t.readings[n].volume,Rate:a(n)};return{reports:e}}return Object(le.jsxs)("div",{children:[Object(le.jsx)("table",{class:"table table-light table-striped table-hover",id:"students",children:Object(le.jsxs)("tbody",{children:[Object(le.jsx)("tr",{class:"table-dark",children:Object.keys(i.reports[0]).map((function(e,t){return console.log(e.toUpperCase()),"ID"===e.toUpperCase()?Object(le.jsx)("th",{children:e.toUpperCase()},t):"TIME"===e.toUpperCase()?Object(le.jsx)("th",{children:e.toUpperCase()+" (s)"},t):"VOLUME"===e.toUpperCase()?Object(le.jsx)("th",{children:e.toUpperCase()+" (mL)"},t):"RATE"===e.toUpperCase()?Object(le.jsx)("th",{children:e.toUpperCase()+" (mL/min)"},t):void 0}))}),l().reports.map((function(e,t){var n=e.id,r=e.Time,c=e.Volume,i=e.Rate;return Object(le.jsxs)("tr",{children:[Object(le.jsx)("td",{children:n}),Object(le.jsx)("td",{children:r}),Object(le.jsx)("td",{children:c}),Object(le.jsx)("td",{children:i.toPrecision(4)})]},n)}))]})}),Object(le.jsx)("table",{class:"table table-light table-striped table-hover",children:Object(le.jsxs)("tbody",{children:[Object(le.jsxs)("tr",{class:"table-dark",children:[Object(le.jsx)("th",{class:"text-center",children:"AVERAGE (mL/min)"}),Object(le.jsx)("th",{className:"text-center",children:"SEVERITY RATING"})]}),Object(le.jsxs)("tr",{class:"table-striped",children:[Object(le.jsx)("td",{className:"text-center",children:s().toPrecision(4)}),(e=s(),e>=he.min?Object(le.jsx)("td",{className:"text-center",children:"None"}):e>=be.min&&e<be.max?Object(le.jsx)("td",{className:"text-center",children:"Strong"}):e>=me.min&&e<me.max?Object(le.jsx)("td",{className:"text-center",children:"Weak"}):Object(le.jsx)("td",{className:"text-center",children:"N/A"}))]})]})})]})},Oe=function(e){var t=e.remainingTime;return 0===t?Object(le.jsx)("div",{className:"timer",children:"Time is up!"}):Object(le.jsxs)("div",{className:"timer",children:[Object(le.jsx)("div",{className:"text",children:"Time remaining:"}),Object(le.jsx)("div",{className:"value",children:t}),Object(le.jsx)("div",{className:"text",children:"seconds"})]})},fe=function(){var e=Object(u.d)(q),t=Number(Object(u.d)(L)),n=Number(Object(u.d)($)),c=Math.min(t,n),i=Object(u.c)(),a=Object(r.useState)({timerIsPlaying:!1,key:0}),s=Object(de.a)(a,2),l=s[0],d=s[1],j=Object(u.d)(v);function b(){var t;t=!1,d(Object(o.a)(Object(o.a)({},l),{},{timerIsPlaying:t}));for(var n=prompt("Enter volumetric data below."),r=!1;0==r;){if(null==n)return;n>c||n<0||isNaN(parseFloat(n))?(window.confirm("Invalid input! Make sure your volume reading is a number less than or equal to: "+c),n=prompt("Enter volumetric data below.")):r=!0}var a=(j+1)*e;i(Y(n)),i(W(n)),i(J(a)),i(p({volume:n,secondsElapsed:a}))}return Object(le.jsxs)("div",{class:"container-fluid",children:[Object(le.jsxs)("h1",{class:"container-fluid row",children:["Current Replication: ",j]}),Object(le.jsx)("div",{class:"container-fluid timer-wrapper",children:Object(le.jsx)(je.CountdownCircleTimer,{isPlaying:l.timerIsPlaying,duration:Number(e),colors:[["#004777",.33],["#F7B801",.33],["#A30000"]],onComplete:function(){return b()},children:Oe},l.key)}),Object(le.jsx)("div",{class:"container-fluid",children:Object(le.jsxs)("div",{class:"row container-fluid",children:[Object(le.jsx)("button",{type:"submit",class:"btn btn-primary",disabled:l.timerIsPlaying,onClick:function(){d({timerIsPlaying:!0,key:l.key+1})},children:l.timerIsPlaying?"Replication Running...":"Start Replication"}),Object(le.jsx)("button",{type:"submit",class:"btn btn-secondary",onClick:function(){i(O(!1)),i(Z("/Infiltrometer/baer-results"))},children:"End Protocol"})]})}),Object(le.jsx)("div",{class:"container-fluid",children:Object(le.jsx)(pe,{})})]})},xe=function(){Object(u.d)(f);var e=Object(u.c)();return Object(le.jsxs)("div",{class:"container-fluid",children:[Object(le.jsxs)("div",{class:"row",children:[Object(le.jsx)("div",{class:"col-sm-2"}),Object(le.jsx)("div",{class:"col-sm-8 text-lg-center",children:Object(le.jsx)("h1",{children:"Baer Results View"})}),Object(le.jsx)("div",{class:"col-sm-2"})]}),Object(le.jsxs)("div",{class:"row",children:[Object(le.jsx)("div",{class:"col-sm-2"}),Object(le.jsx)("div",{class:"col-sm-8",children:Object(le.jsx)("div",{class:"container",children:Object(le.jsx)(pe,{})})}),Object(le.jsx)("div",{class:"col-sm-2"})]}),Object(le.jsxs)("div",{className:"row",children:[Object(le.jsx)("div",{className:"col-sm-2"}),Object(le.jsx)("div",{className:"col-sm-8 text-lg-center",children:Object(le.jsx)("button",{class:"btn btn-dark",onClick:function(){return e(Z("/Infiltrometer/baer-initialize"))},children:"New Test"})}),Object(le.jsx)("div",{className:"col-sm-2"})]})]})};n(70);function ve(e,t){var n=[],r=[];e.forEach((function(e,c){null!==e[1]&&(r.push(e),n.push(t[c]))}));var c=r.reduce((function(e,t){return e+t[1]}),0)/r.length,i=r.reduce((function(e,t){var n=t[1]-c;return e+n*n}),0);return 1-r.reduce((function(e,t,r){var c=n[r],i=t[1]-c[1];return e+i*i}),0)/i}function ge(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}var ye={linear:function(e,t){for(var n=[0,0,0,0,0],r=0,c=0;c<e.length;c++)null!==e[c][1]&&(r++,n[0]+=e[c][0],n[1]+=e[c][1],n[2]+=e[c][0]*e[c][0],n[3]+=e[c][0]*e[c][1],n[4]+=e[c][1]*e[c][1]);var i=r*n[2]-n[0]*n[0],a=r*n[3]-n[0]*n[1],s=0===i?0:ge(a/i,t.precision),l=ge(n[1]/r-s*n[0]/r,t.precision),o=function(e){return[ge(e,t.precision),ge(s*e+l,t.precision)]},u=e.map((function(e){return o(e[0])}));return{points:u,predict:o,equation:[s,l],r2:ge(ve(e,u),t.precision),string:0===l?"y = ".concat(s,"x"):"y = ".concat(s,"x + ").concat(l)}},exponential:function(e,t){for(var n=[0,0,0,0,0,0],r=0;r<e.length;r++)null!==e[r][1]&&(n[0]+=e[r][0],n[1]+=e[r][1],n[2]+=e[r][0]*e[r][0]*e[r][1],n[3]+=e[r][1]*Math.log(e[r][1]),n[4]+=e[r][0]*e[r][1]*Math.log(e[r][1]),n[5]+=e[r][0]*e[r][1]);var c=n[1]*n[2]-n[5]*n[5],i=Math.exp((n[2]*n[3]-n[5]*n[4])/c),a=(n[1]*n[4]-n[5]*n[3])/c,s=ge(i,t.precision),l=ge(a,t.precision),o=function(e){return[ge(e,t.precision),ge(s*Math.exp(l*e),t.precision)]},u=e.map((function(e){return o(e[0])}));return{points:u,predict:o,equation:[s,l],string:"y = ".concat(s,"e^(").concat(l,"x)"),r2:ge(ve(e,u),t.precision)}},logarithmic:function(e,t){for(var n=[0,0,0,0],r=e.length,c=0;c<r;c++)null!==e[c][1]&&(n[0]+=Math.log(e[c][0]),n[1]+=e[c][1]*Math.log(e[c][0]),n[2]+=e[c][1],n[3]+=Math.pow(Math.log(e[c][0]),2));var i=ge((r*n[1]-n[2]*n[0])/(r*n[3]-n[0]*n[0]),t.precision),a=ge((n[2]-i*n[0])/r,t.precision),s=function(e){return[ge(e,t.precision),ge(ge(a+i*Math.log(e),t.precision),t.precision)]},l=e.map((function(e){return s(e[0])}));return{points:l,predict:s,equation:[a,i],string:"y = ".concat(a," + ").concat(i," ln(x)"),r2:ge(ve(e,l),t.precision)}},power:function(e,t){for(var n=[0,0,0,0,0],r=e.length,c=0;c<r;c++)null!==e[c][1]&&(n[0]+=Math.log(e[c][0]),n[1]+=Math.log(e[c][1])*Math.log(e[c][0]),n[2]+=Math.log(e[c][1]),n[3]+=Math.pow(Math.log(e[c][0]),2));var i=(r*n[1]-n[0]*n[2])/(r*n[3]-Math.pow(n[0],2)),a=(n[2]-i*n[0])/r,s=ge(Math.exp(a),t.precision),l=ge(i,t.precision),o=function(e){return[ge(e,t.precision),ge(ge(s*Math.pow(e,l),t.precision),t.precision)]},u=e.map((function(e){return o(e[0])}));return{points:u,predict:o,equation:[s,l],string:"y = ".concat(s,"x^").concat(l),r2:ge(ve(e,u),t.precision)}},polynomial:function(e,t){for(var n=[],r=[],c=0,i=0,a=e.length,s=t.order+1,l=1;l<s;l++){for(var o=0;o<a;o++)null!==e[o][1]&&(c+=Math.pow(e[o][0],l)*e[o][1]);n.push(c),c=0;for(var u=[],j=1;j<s;j++){for(var b=0;b<a;b++)null!==e[b][1]&&(i+=Math.pow(e[b][0],l+j));u.push(i),i=0}r.push(u)}r.push(n);for(var m=[0].concat(Object(d.a)(function(e,t){for(var n=e,r=e.length-1,c=[t],i=0;i<r;i++){for(var a=i,s=i+1;s<r;s++)Math.abs(n[i][s])>Math.abs(n[i][a])&&(a=s);for(var l=i;l<r+1;l++){var o=n[l][i];n[l][i]=n[l][a],n[l][a]=o}for(var u=i+1;u<r;u++)for(var d=r;d>=i;d--)n[d][u]-=n[d][i]*n[i][u]/n[i][i]}for(var j=r-1;j>=0;j--){for(var b=0,m=j+1;m<r;m++)b+=n[m][j]*c[m];c[j]=(n[r][j]-b)/n[j][j]}return c}(r,s).map((function(e){return ge(e,t.precision)})))),h=function(e){return[ge(e,t.precision),ge(m.reduce((function(t,n,r){return t+n*Math.pow(e,r)}),0),t.precision)]},p=e.map((function(e){return h(e[0])})),O="y = ",f=m.length-1;f>=0;f--)O+=f>1?"".concat(m[f],"x^").concat(f," + "):1===f?"".concat(m[f],"x + "):m[f];return{string:O,points:p,predict:h,equation:Object(d.a)(m).reverse(),r2:ge(ve(e,p),t.precision)}}};function Ie(){var e={value:"",results:{}};return Object(le.jsxs)("div",{children:[Object(le.jsx)("form",{children:Object(le.jsxs)("label",{children:["Data Points: ",e.value,Object(le.jsx)("input",{type:"text",onChange:function(t){e.value=t.target.value}})]})}),Object(le.jsx)("div",{children:Object(le.jsx)("button",{onClick:function(t){for(var n=e.value.split(" "),r=0;r<n.length;r++)n[r]=n[r].split(",");e.results=ye.polynomial(n,{order:2,precision:15}),alert("Points were submitted: "+n+"\nRegression output: "+e.results.string),console.log(e.results)},children:"Submit For Regression"})})]})}var we=function(){var e=Object(l.g)().pathname,t=Object(u.d)(ee),n=Object(u.c)();return e==t?(n(Z(null)),null):null!=t?Object(le.jsx)(l.a,{to:t}):null},Se=n(263),Ne=n(261),Re=n(267),ke=n(262),Me=function(){var e=Object(u.c)(),t=Object(r.useState)({collapsed:!1}),n=Object(de.a)(t,2);n[0],n[1];return Object(le.jsx)(Se.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:Object(le.jsxs)(Ne.a,{children:[Object(le.jsx)(Se.a.Brand,{children:"Infiltrometer"}),Object(le.jsx)(Se.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(le.jsxs)(Se.a.Collapse,{id:"responsive-navbar-nav",children:[Object(le.jsxs)(Re.a,{className:"me-auto",children:[Object(le.jsx)(Re.a.Link,{onClick:function(){return e(Z("/Infiltrometer"))},children:"About Us"}),Object(le.jsx)(ke.a,{title:"New Test",id:"new-test-drop-down",children:Object(le.jsx)(ke.a.Item,{onClick:function(){return e(Z("/Infiltrometer/baer-initialize/"))},children:"BAER protocol"})}),Object(le.jsx)(Re.a.Link,{onCkilck:function(){return e(Z("Infiltrometer/reports"))},children:"My Reports"}),Object(le.jsxs)(ke.a,{title:"Manuals",id:"manuals-drop-down",children:[Object(le.jsx)(ke.a.Divider,{}),Object(le.jsx)(ke.a.Item,{onClick:function(){return e(Z("/Infiltrometer/manuals-baer/"))},children:"BAER"}),Object(le.jsx)(ke.a.Divider,{}),Object(le.jsx)(ke.a.Item,{onClick:function(){return e(Z("/Infiltrometer/manuals-infiltrometer/"))},children:"Infiltrometer"}),Object(le.jsx)(ke.a.Divider,{})]})]}),Object(le.jsx)(Re.a,{children:Object(le.jsx)(Re.a.Link,{href:"https://github.com/2021-SD-UI/Infiltrometer/",children:"GitHub"})})]})]})})},Te=function(){return Object(le.jsxs)(s.a,{children:[Object(le.jsx)(Me,{}),Object(le.jsx)(we,{}),Object(le.jsxs)(l.d,{children:[Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/",children:Object(le.jsx)("div",{children:Object(le.jsx)("h1",{children:"Home Page"})})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/baer-initialize",children:Object(le.jsx)(ue,{})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/baer-replication",children:Object(le.jsx)(fe,{})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/baer-results",children:Object(le.jsx)(xe,{})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/testing/regression",children:Object(le.jsx)(Ie,{})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/manuals-baer",children:Object(le.jsx)("h1",{children:"TODO: Baer Manual"})}),Object(le.jsx)(l.b,{exact:!0,path:"/Infiltrometer/manuals-infiltrometer",children:Object(le.jsx)("h1",{children:"TODO: infiltrometer Manual"})}),Object(le.jsx)(l.b,{exact:!0,path:"Infiltrometer/reports",children:Object(le.jsx)("h1",{children:"TODO: Reports Page"})})]})]})},Ce=n(103),Ve=n.n(Ce),Ee=n(132);function De(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var Pe=Object(j.b)("counter/fetchCount",function(){var e=Object(Ee.a)(Ve.a.mark((function e(t){var n;return Ve.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,De(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Le=Object(j.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(Pe.pending,(function(e){e.status="loading"})).addCase(Pe.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),Ae=Le.actions,qe=(Ae.increment,Ae.decrement,Ae.incrementByAmount,Le.reducer),Ue=Object(j.c)({name:"baerResults",initialState:{volume:0,secondsElapsed:0},reducers:{}}).reducer,ze=n(268),Be=Object(j.a)({reducer:{baerInitialize:G,baerReplication:_,baerResults:Ue,counter:qe,reports:g,form:ze.a,redirector:te}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(253);a.a.render(Object(le.jsx)(c.a.StrictMode,{children:Object(le.jsx)(u.a,{store:Be,children:Object(le.jsx)(Te,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[254,1,2]]]);
//# sourceMappingURL=main.2f3d894a.chunk.js.map
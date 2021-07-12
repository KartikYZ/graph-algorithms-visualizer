(this["webpackJsonpgraph-visualizer"]=this["webpackJsonpgraph-visualizer"]||[]).push([[0],{11:function(e,t,i){},19:function(e,t,i){},20:function(e,t,i){},22:function(e,t,i){"use strict";i.r(t);var n=i(4),r=i.n(n),a=i(13),s=i.n(a),o=(i(19),i(3)),l=i(1),c=i(2),h=i(5),u=i(7),d=i(6),g=(i(20),i(12)),v=i(0),f=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).state={sliderValue:n.props.sliderValue},n}return Object(c.a)(i,[{key:"handleOnChange",value:function(e){this.props.onSliderChange(parseInt(e.currentTarget.value))}},{key:"componentDidUpdate",value:function(){this.setState((function(e,t){if(t.sliderValue!==e.sliderValue)return{sliderValue:t.sliderValue}}))}},{key:"render",value:function(){var e=this;return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("input",{type:"range",value:this.state.sliderValue,max:this.props.sliderLength-1,onChange:function(t){return e.handleOnChange(t)},name:"slider"}),Object(v.jsx)("label",{children:this.props.label})]})}}]),i}(r.a.Component),p=(i(11),function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(h.a)(n)),n}return Object(c.a)(i,[{key:"handleClick",value:function(){this.props.onClick()}},{key:"render",value:function(){var e=this;return Object(v.jsx)("div",{className:"button",style:{backgroundColor:"#222222",display:"flex",justifyContent:"center",padding:"4px"},onClick:function(){return e.props.onClick()},children:Object(v.jsxs)("p",{className:"button",style:{padding:"2px 5px",backgroundColor:"#222222"},children:[" ",this.props.label," "]})})}}]),i}(r.a.Component)),y=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(){return Object(l.a)(this,i),t.apply(this,arguments)}return Object(c.a)(i,[{key:"render",value:function(){return Object(v.jsxs)("div",{style:{backgroundColor:"#333333",border:"1px solid black",borderRadius:"8px",padding:"10px",margin:"0 2px",color:"rgba(255, 255, 255, 0.8)"},children:[Object(v.jsx)("h3",{style:{textAlign:"center",paddingBottom:5},children:this.props.title}),this.props.children]})}}]),i}(r.a.Component),b=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).checkBoxRef=void 0,n.checkBoxRef=r.a.createRef(),n.handleClick=n.handleClick.bind(Object(h.a)(n)),n}return Object(c.a)(i,[{key:"handleClick",value:function(){if(this.checkBoxRef){var e=this.checkBoxRef.current;(null===e||void 0===e?void 0:e.checked)?this.props.onSelect(!0):this.props.onSelect(!1)}}},{key:"render",value:function(){return Object(v.jsxs)("div",{style:{padding:"2px",marginBottom:"2px"},children:[Object(v.jsx)("input",{type:"checkbox",onClick:this.handleClick,ref:this.checkBoxRef}),Object(v.jsxs)("label",{children:[" ",this.props.label]})]})}}]),i}(r.a.Component),S=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(){return Object(l.a)(this,i),t.apply(this,arguments)}return Object(c.a)(i,[{key:"render",value:function(){var e=this,t=this.props.options.map((function(e){return Object(v.jsx)("option",{value:e,children:e},e)}));return Object(v.jsxs)("div",{children:[Object(v.jsxs)("label",{htmlFor:"dropdown",children:[this.props.label," "]}),Object(v.jsx)("select",{id:"dropdown",defaultValue:this.props.options[0],onChange:function(t){return e.props.onChange(t.currentTarget.value)},children:t})]})}}]),i}(r.a.Component),k=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).handleOnStart=n.handleOnStart.bind(Object(h.a)(n)),n}return Object(c.a)(i,[{key:"handleOnStart",value:function(){}},{key:"render",value:function(){var e=this;return Object(v.jsxs)("div",{style:{backgroundColor:"#222222",padding:"10px 0",display:"flex",justifyContent:"center"},children:[Object(v.jsxs)(y,{title:"Graph",children:[Object(v.jsx)(b,{label:"Directed Edges",onSelect:this.props.graphProps.onSelectDirectedEdges}),Object(v.jsx)(b,{label:"Show Weights",onSelect:this.props.graphProps.onSelectShowWeights}),Object(v.jsx)(b,{label:"Show Vertex Positions",onSelect:this.props.graphProps.onSelectShowVertexPositions}),Object(v.jsx)(f,Object(g.a)({},this.props.gridSizeSliderProps)),Object(v.jsx)(p,{label:"Clear",onClick:this.props.graphProps.onClear})]}),Object(v.jsxs)(y,{title:"Algorithms",children:[Object(v.jsx)(S,{label:"Select Algorithm",options:this.props.startButtonProps.options,onChange:function(t){return e.props.startButtonProps.onSelection(t)}}),Object(v.jsx)(p,{label:"Generate Grid Graph",onClick:this.props.graphProps.onGenerateGrid}),Object(v.jsx)(p,{label:"Generate Random Graph",onClick:this.props.graphProps.onGenerateRandom})]}),Object(v.jsxs)(y,{title:"Animation",children:[Object(v.jsx)(f,Object(g.a)({},this.props.animationSpeedSliderProps)),Object(v.jsx)(p,{label:"Start",onClick:this.props.startButtonProps.onStart})]}),Object(v.jsx)(y,{title:"Custom graphs",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"subtitle",children:"Addition"}),"1. Click on nodes to start drawing. Click on the currently active source node to exit draw mode. ",Object(v.jsx)("br",{}),"2. Click on nodes other than the currently active source node to draw edges. ",Object(v.jsx)("br",{}),"3. Use the toolbar to switch between directed/undirected/weighted/unweighted edges. ",Object(v.jsx)("br",{}),Object(v.jsx)("p",{className:"subtitle",children:"Removal"}),"1. Right click on vertex to remove it (and its incident edges, if any). ",Object(v.jsx)("br",{}),"2. To remove an undirected edge, draw over/retrace the edge. ",Object(v.jsx)("br",{}),"3. To remove a directed edge, draw/retrace the edge from its tail to the arrowhead. ",Object(v.jsx)("br",{})]})})]})}}]),i}(r.a.Component),j="rgba(0, 0, 0, 1)",x="rgba(255, 255, 255, 0.8)",m="rgba(255, 255, 0, 0.9)",w="rgba(190, 190, 190, 0.8)",O={background:"rgba(255, 255, 255, 1)",gridLines:"rgba(190, 190, 190, 1)",hoverVertex:w,hoverEdge:w,currentVertex:x,graphVertex:x,graphEdge:x,vertexPosition:m,edgeWeight:j,edgeWeightBackground:x,edgeWeightBorder:j,animRed:"rgba(252, 77, 61, 1.0)",animBlue:"rgba(50, 100, 168, 1)",animGreen:"rgba(98, 217, 131, 1)",animYellow:m,animOrange:"rgba(255, 165, 0, 1)"},V=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).canvasRef=void 0,n.canvas=void 0,n.constCanvasElement=void 0,n.canvasRef=r.a.createRef(),n.canvas=null,n.constCanvasElement=Object(v.jsx)("canvas",{id:"canvas",ref:n.canvasRef,onClick:n.props.onClick,onContextMenu:n.props.handleRightClick,onMouseMove:n.props.onMouseMove}),n}return Object(c.a)(i,[{key:"componentDidMount",value:function(){if(this.canvas=this.canvasRef.current,this.canvas){var e=this.canvas.getContext("2d");if(e){this.canvas.style.width="".concat(i.WIDTH,"px"),this.canvas.style.height="".concat(i.HEIGHT,"px");var t=window.devicePixelRatio;this.canvas.width=Math.floor(i.WIDTH*t),this.canvas.height=Math.floor(i.HEIGHT*t),e.scale(t,t),this.drawGrid(e)}}}},{key:"componentDidUpdate",value:function(){var e=this.canvas.getContext("2d");if(e){this.drawGrid(e);var t=this.props,i=t.hoveringVertex,n=t.hoveringEdge,r=t.currentVertex,a=t.graph,s=t.animationFrame,l=a.getIsDirected(),c=a.getShowPositions(),h=a.vertices(),u=a.edges(),d=performance.now();if(s&&this.colorFrame(s),l){var g,v=Object(o.a)(u);try{for(v.s();!(g=v.n()).done;){var f=g.value;this.drawDirectedEdge(f,e)}}catch(C){v.e(C)}finally{v.f()}}else{var p,y=Object(o.a)(u);try{for(y.s();!(p=y.n()).done;){var b=p.value;this.drawUndirectedEdge(b,e)}}catch(C){y.e(C)}finally{y.f()}}n&&(l?this.drawDirectedEdge(n,e):this.drawUndirectedEdge(n,e)),i&&(this.drawHoverVertex(i,e),c&&this.drawVertexPosition(i,e));var S,k=Object(o.a)(h);try{for(k.s();!(S=k.n()).done;){var j=S.value;j.equals(r)||this.drawGraphVertex(j,e)}}catch(C){k.e(C)}finally{k.f()}if(r){var x=r.getColor();r.setColor(O.currentVertex),this.drawCurrentVertex(r,e),r.setColor(x)}if(this.props.graph.getShowWeights()){var m,w=Object(o.a)(u);try{for(w.s();!(m=w.n()).done;){var V=m.value;this.drawEdgeWeight(V,!1,e)}}catch(C){w.e(C)}finally{w.f()}}s&&this.unColorFrame(s);var E=performance.now();console.log(Math.round(E-d))}}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"canvas-container",style:{height:i.HEIGHT+50,backgroundColor:"#444444"},children:this.constCanvasElement})}},{key:"drawGrid",value:function(e){var t=this.props,n=t.gridSize,r=t.nodeRadius;if(e){e.clearRect(0,0,i.WIDTH,i.HEIGHT),e.fillStyle=O.gridLines,e.strokeStyle=O.gridLines;for(var a=1;a<i.WIDTH/n;a++)for(var s=1;s<i.HEIGHT/n;s++){var o=a*n,l=s*n;e.beginPath(),e.moveTo(0,l),e.lineTo(i.WIDTH,l),e.stroke(),e.beginPath(),e.moveTo(o,0),e.lineTo(o,i.HEIGHT),e.stroke(),e.beginPath(),e.arc(a*n,s*n,r,0,2*Math.PI),e.fill()}}}},{key:"drawCircle",value:function(e,t,i,n){var r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=arguments.length>5?arguments[5]:void 0,s=arguments.length>6?arguments[6]:void 0;a.save(),a.beginPath(),a.arc(e,t,i,0,2*Math.PI,!0),r?(a.fillStyle=n,a.fill()):(s&&(a.lineWidth=s),a.strokeStyle=n,a.stroke()),a.restore()}},{key:"drawVertex",value:function(e,t){var n=e.getPosition(),r=this.props.gridSize;this.drawCircle(n[0]*r,n[1]*r,i.VERTEX_RADIUS,e.getColor(),!0,t)}},{key:"drawHoverVertex",value:function(e,t){this.drawVertex(e,t)}},{key:"drawCurrentVertex",value:function(e,t){this.drawVertex(e,t)}},{key:"drawGraphVertex",value:function(e,t){this.drawVertex(e,t)}},{key:"drawVertexPosition",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e.getPosition(),r=this.props.gridSize,a=n[0]*r,s=n[1]*r;t.save(),t.translate(a,s),i&&(t.strokeStyle="black",t.fillStyle="rgba(0, 0, 0, 0.5)",t.strokeRect(-50,-26,40,24),t.fillRect(-50,-26,42,24));var o="(".concat(n[0],", ").concat(n[1],")");t.font="18px serif",t.fillStyle=O.vertexPosition,t.fillText(o,-(t.measureText(o).width+10),-10),t.restore(),t.restore()}},{key:"drawUndirectedEdge",value:function(e,t){var i=e.start.getPosition(),n=e.end.getPosition(),r=this.props,a=r.gridSize,s=r.nodeRadius;t.save(),t.strokeStyle=e.getColor(),t.lineWidth=s,t.beginPath(),t.moveTo(i[0]*a,i[1]*a),t.lineTo(n[0]*a,n[1]*a),t.stroke(),t.restore()}},{key:"drawDirectedEdge",value:function(e,t){this.drawUndirectedEdge(e,t),this.drawEdgeArrow(e,t)}},{key:"drawEdgeArrow",value:function(e,t){var i=e.start.getPosition(),n=e.end.getPosition(),r=this.props.gridSize,a=Math.atan2(n[1]-i[1],n[0]-i[0]);t.save(),t.strokeStyle=t.fillStyle=e.getColor(),t.translate(n[0]*r-this.props.nodeRadius*Math.cos(a),n[1]*r-this.props.nodeRadius*Math.sin(a)),t.rotate(a),t.moveTo(-14,0),t.lineTo(-20,8),t.lineTo(0,0),t.lineTo(-20,-8),t.lineTo(-14,0),t.stroke(),t.clip(),t.fill(),t.restore()}},{key:"drawEdgeWeight",value:function(e,t,i){var n=e.start.getPosition(),r=e.end.getPosition(),a=e.getWeight().toString();i.save(),i.translate(.5*(r[0]+n[0])*this.props.gridSize,.5*(r[1]+n[1])*this.props.gridSize),t?(this.drawCircle(0,0,15,O.edgeWeightBackground,!0,i),this.drawCircle(0,0,15,O.edgeWeightBorder,!1,i)):(i.strokeStyle=O.edgeWeightBorder,i.fillStyle=O.edgeWeightBackground,i.strokeRect(-15,-15,30,30),i.fillRect(-15,-15,30,30)),i.font="18px serif",i.fillStyle=O.edgeWeight,i.fillText(a,-i.measureText(a).width/2,6),i.restore()}},{key:"colorEdges",value:function(e,t){var i,n=Object(o.a)(e);try{for(n.s();!(i=n.n()).done;){i.value.setColor(t)}}catch(l){n.e(l)}finally{n.f()}if(!this.props.graph.getIsDirected()){var r,a=Object(o.a)(e);try{for(a.s();!(r=a.n()).done;){var s=r.value;this.props.graph.getEdge(s.getEnd(),s.getStart()).setColor(t)}}catch(l){a.e(l)}finally{a.f()}}}},{key:"colorVertices",value:function(e,t){var i,n=Object(o.a)(e);try{for(n.s();!(i=n.n()).done;){i.value.setColor(t)}}catch(r){n.e(r)}finally{n.f()}}},{key:"colorFrame",value:function(e){var t=e.outlineVertices,i=e.redVertices,n=e.yellowVertices,r=e.greenVertices,a=e.redEdges,s=e.yellowEdges,o=e.greenEdges;a&&this.colorEdges(a,O.animRed),s&&this.colorEdges(s,O.animYellow),o&&this.colorEdges(o,O.animGreen),i&&this.colorVertices(i,O.animRed),n&&this.colorVertices(n,O.animYellow),r&&this.colorVertices(r,O.animGreen),t&&this.colorVertices(t,O.animOrange)}},{key:"unColorFrame",value:function(e){var t=e.outlineVertices,i=e.redVertices,n=e.yellowVertices,r=e.greenVertices,a=e.redEdges,s=e.yellowEdges,o=e.greenEdges;a&&this.colorEdges(a,O.graphEdge),s&&this.colorEdges(s,O.graphEdge),o&&this.colorEdges(o,O.graphEdge),i&&this.colorVertices(i,O.graphVertex),n&&this.colorVertices(n,O.graphVertex),r&&this.colorVertices(r,O.graphVertex),t&&this.colorVertices(t,O.graphVertex)}}]),i}(r.a.Component);V.defaultProps={nodeRadius:5},V.VERTEX_RADIUS=10,V.WIDTH=1600,V.HEIGHT=800;var E=V,C=function(){function e(t,i,n){Object(l.a)(this,e),this.position=void 0,this.data=void 0,this.color=void 0,this.position=t,this.data=n,this.color=i}return Object(c.a)(e,[{key:"equals",value:function(t){return t instanceof e&&null!=t&&(this.position[0]===t.position[0]&&this.position[1]===t.position[1])}},{key:"getPosition",value:function(){return this.position}},{key:"getData",value:function(){return this.data}},{key:"getColor",value:function(){return this.color}},{key:"setColor",value:function(e){this.color=e}},{key:"toString",value:function(){return"x: ".concat(this.position[0],", y:").concat(this.position[1])}},{key:"hashCode",value:function(){var e=19;return 31*(e=29*e+this.position[0])+this.position[1]}}]),e}(),P=function(){function e(t,i,n,r){if(Object(l.a)(this,e),this.start=void 0,this.end=void 0,this.weight=void 0,this.color=void 0,this.start=t,this.end=i,this.color=n,r)this.weight=r;else{var a=this.start.getPosition(),s=this.end.getPosition();this.weight=parseFloat(Math.sqrt(Math.pow(a[0]-s[0],2)+Math.pow(a[1]-s[1],2)).toFixed(1))}}return Object(c.a)(e,[{key:"equals",value:function(t){return t instanceof e&&null!=t&&!(!this.start.equals(t.start)||!this.end.equals(t.end))}},{key:"getStart",value:function(){return this.start}},{key:"setStart",value:function(e){this.start=e}},{key:"getEnd",value:function(){return this.end}},{key:"setEnd",value:function(e){this.end=e}},{key:"getWeight",value:function(){return this.weight}},{key:"getColor",value:function(){return this.color}},{key:"setColor",value:function(e){this.color=e}},{key:"toString",value:function(){return"start: ".concat(this.start,", end:").concat(this.end)}},{key:"hashCode",value:function(){var e=19;return 31*(e=29*e+this.start.hashCode())+this.end.hashCode()}}]),e}();function A(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function T(){return 1===A(0,1)}var I=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;Object(l.a)(this,i),(n=t.call(this,e)).gridState=void 0;var r=n.props.graph;return n.state={hoveringVertex:null,currentVertex:null,hoveringEdge:null,graph:r},n.gridState={cursor:[-1,-1],nearestVertexInPixels:[-1,-1]},n}return Object(c.a)(i,[{key:"handleClick",value:function(e){if(!this.props.isAnimating){var t=this.state,i=t.hoveringVertex,n=t.hoveringEdge,r=t.currentVertex,a=t.graph;if(i){if(i.equals(r))this.setState({currentVertex:null,hoveringEdge:null});else{n&&(a.edgeSet.contains(n)?a.removeEdge(n):a.insertEdge(n));var s=new C(i.getPosition(),O.currentVertex);this.setState({currentVertex:s,hoveringEdge:null})}a.vertexSet.contains(i)||a.insertVertex(i)}}}},{key:"handleRightClick",value:function(e){if(e.preventDefault(),!this.props.isAnimating){var t=this.state,i=t.hoveringVertex,n=t.graph;i&&n.vertexSet.contains(i)&&(n.removeVertex(i),this.setState({currentVertex:null,hoveringEdge:null}))}}},{key:"handleMouseMove",value:function(e){if(!this.props.isAnimating){var t=this.gridState.nearestVertexInPixels;if(this.gridState.cursor=[e.nativeEvent.offsetX,e.nativeEvent.offsetY],(this.nearestVertexInPixels(this.gridState.cursor)[0]!==t[0]||this.nearestVertexInPixels(this.gridState.cursor)[1]!==t[1])&&(this.gridState.nearestVertexInPixels=this.nearestVertexInPixels(this.gridState.cursor),this.state.currentVertex)){var i=new P(this.state.currentVertex,this.PixelsToVertex(this.gridState.nearestVertexInPixels,O.hoverVertex),O.hoverEdge);this.setState({hoveringEdge:i})}this.inVertexRadius(this.gridState.cursor)?this.state.hoveringVertex||this.setState({hoveringVertex:this.PixelsToVertex(this.gridState.nearestVertexInPixels,O.hoverVertex)}):this.state.hoveringVertex&&this.setState({hoveringVertex:null})}}},{key:"render",value:function(){var e=this;return Object(v.jsx)(E,{gridSize:this.props.gridSize,nodeRadius:this.props.nodeRadius,hoveringVertex:this.state.hoveringVertex,hoveringEdge:this.state.hoveringEdge,currentVertex:this.state.currentVertex,graph:this.state.graph,animationFrame:this.props.animationFrame,onClick:function(t){return e.handleClick(t)},handleRightClick:function(t){return e.handleRightClick(t)},onMouseMove:function(t){return e.handleMouseMove(t)}})}},{key:"PixelsToVertex",value:function(e,t){var i=this,n=e.map((function(e){return e/i.props.gridSize}));return new C([n[0],n[1]],t)}},{key:"nearestVertexInPixels",value:function(e){var t=this.props.gridSize,i=e.map((function(e){return Math.round(e/t)*t})),n=[i[0],i[1]];switch(n[0]){case 0:n[0]+=t;break;case E.WIDTH:n[0]-=t}switch(n[1]){case 0:n[1]+=t;break;case E.HEIGHT:n[1]-=t}return n}},{key:"inVertexRadius",value:function(e){var t,i,n=this.nearestVertexInPixels(e);return n[0]>0&&n[0]<E.WIDTH&&n[1]>0&&n[1]<E.HEIGHT&&(t=e,i=n,Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))<E.VERTEX_RADIUS)}}]),i}(r.a.Component),z=function(){function e(){Object(l.a)(this,e),this.table=void 0,this.size=void 0,this.length=void 0,this.table=new Array(e.INITIAL_CAPACITY),this.length=e.INITIAL_CAPACITY,this.size=0}return Object(c.a)(e,[{key:"put",value:function(t,i){if(null==t)throw new Error("Key is null.");if(null==i)throw new Error("Value is null.");(this.size+1)/this.length>e.MAX_LOAD_FACTOR&&this.resizeBackingTable(2*this.length+1);for(var n=this.hashAndCompression(t),r=this.table[n];null!=r&&!r.getKey().equals(t);)r=r.getNext();if(null==r)return this.table[n]=new M(t,i,this.table[n]),this.size++,null;var a=r.getValue();return r.setValue(i),a}},{key:"remove",value:function(e){if(null==e)throw new Error("Given key is null.");var t=this.hashAndCompression(e),i=this.table[t];if(null==i)throw new Error("Key: ".concat(e," not in map."));var n=null;if(i.getKey().equals(e))return n=i.getValue(),this.table[t]=i.getNext(),this.size--,n;for(;null!=i&&null!=i.getNext();){if(i.getNext().getKey().equals(e)){n=i.getNext().getValue(),i.setNext(i.getNext().getNext()),this.size--;break}i=i.getNext()}if(null==n)throw new Error("Key: ".concat(e," not in map."));return n}},{key:"get",value:function(e){if(null==e)throw new Error("Key is null.");for(var t=this.hashAndCompression(e),i=this.table[t];null!=i;){if(i.getKey().equals(e))return i.getValue();i=i.getNext()}throw new Error("Key: "+e+" not in map.")}},{key:"getKey",value:function(e){if(null==e)throw new Error("Key is null.");for(var t=this.hashAndCompression(e),i=this.table[t];null!=i;){if(i.getKey().equals(e))return i.getKey();i=i.getNext()}return null}},{key:"containsKey",value:function(e){if(null==e)throw new Error("Key is null.");for(var t=this.hashAndCompression(e),i=this.table[t];null!=i;){if(i.getKey().equals(e))return!0;i=i.getNext()}return!1}},{key:"keySet",value:function(){var e,t=[],i=Object(o.a)(this.table);try{for(i.s();!(e=i.n()).done;){var n=e.value;if(n)for(var r=n;null!=r;)t.push(r.getKey()),r=r.getNext();if(t.length===this.size)break}}catch(a){i.e(a)}finally{i.f()}return t}},{key:"values",value:function(){var e,t=[],i=Object(o.a)(this.table);try{for(i.s();!(e=i.n()).done;){var n=e.value;if(n)for(var r=n;null!=r;)t.push(r.getValue()),r=r.getNext();if(t.length===this.size)break}}catch(a){i.e(a)}finally{i.f()}return t}},{key:"getSize",value:function(){return this.size}},{key:"clear",value:function(){this.table=new Array(e.INITIAL_CAPACITY),this.length=e.INITIAL_CAPACITY,this.size=0}},{key:"resizeBackingTable",value:function(e){if(e<this.size)throw new Error("Length: ".concat(e," is less than current size of hash map."));if(e!==this.length){var t=this.table;this.table=new Array(e),this.length=e;var i,n=0,r=Object(o.a)(t);try{for(r.s();!(i=r.n()).done;){var a=i.value;if(a)for(var s=a;s;){var l=s.getKey(),c=s.getValue(),h=this.hashAndCompression(l);this.table[h]=new M(l,c,this.table[h]),n++,s=s.getNext()}if(n===this.size)return}}catch(u){r.e(u)}finally{r.f()}}}},{key:"hashAndCompression",value:function(e){return Math.abs(e.hashCode()%this.length)}}]),e}();z.INITIAL_CAPACITY=13,z.MAX_LOAD_FACTOR=.75;var M=function(){function e(t,i,n){Object(l.a)(this,e),this.key=void 0,this.value=void 0,this.next=void 0,this.key=t,this.value=i,this.next=n||null}return Object(c.a)(e,[{key:"getKey",value:function(){return this.key}},{key:"getValue",value:function(){return this.value}},{key:"getNext",value:function(){return this.next}},{key:"setKey",value:function(e){this.key=e}},{key:"setValue",value:function(e){this.value=e}},{key:"setNext",value:function(e){this.next=e}},{key:"toString",value:function(){var e=this.key.toString(),t=this.value;return"(".concat(e,", ").concat(t,")")}},{key:"equals",value:function(t){return t instanceof e&&(t.getKey().equals(this.key)&&t.getValue().equals(this.value))}}]),e}(),R=function(){function e(){Object(l.a)(this,e),this.map=void 0,this.map=new z}return Object(c.a)(e,[{key:"add",value:function(t){this.map.put(t,e.PRESENT)}},{key:"remove",value:function(e){return this.map.remove(e)}},{key:"get",value:function(e){return this.map.getKey(e)}},{key:"contains",value:function(e){return this.map.containsKey(e)}},{key:"getSet",value:function(){return this.map.keySet()}},{key:"getSize",value:function(){return this.map.getSize()}},{key:"clear",value:function(){this.map=new z}},{key:"toString",value:function(){return this.getSet().toString()}}]),e}();R.PRESENT={};var G=function(){function e(t,i,n){Object(l.a)(this,e),this.isDirected=void 0,this.showWeights=void 0,this.showPositions=void 0,this.vertexSet=void 0,this.edgeSet=void 0,this.adjacencyMap=void 0,this.isDirected=t,this.showWeights=i,this.showPositions=n,this.vertexSet=new R,this.edgeSet=new R,this.adjacencyMap=new z}return Object(c.a)(e,[{key:"numVertices",value:function(){return this.vertexSet.getSize()}},{key:"numEdges",value:function(){return this.edgeSet.getSize()}},{key:"vertices",value:function(){return this.vertexSet.getSet()}},{key:"edges",value:function(){return this.edgeSet.getSet()}},{key:"getEdge",value:function(e,t){try{return this.adjacencyMap.get(e).outgoing.get(t)}catch(i){return null}}},{key:"endVertices",value:function(e){return[e.getStart(),e.getEnd()]}},{key:"opposite",value:function(e,t){if(e.equals(t.getStart()))return t.getEnd();if(e.equals(t.getEnd()))return t.getStart();throw new Error("".concat(t," not incident to ").concat(e))}},{key:"outDegree",value:function(e){return this.adjacencyMap.get(e).outgoing.getSize()}},{key:"inDegree",value:function(e){return this.adjacencyMap.get(e).incoming.getSize()}},{key:"outgoingEdges",value:function(e){return this.adjacencyMap.get(e).outgoing.values()}},{key:"incomingEdges",value:function(e){return this.adjacencyMap.get(e).incoming.values()}},{key:"insertVertex",value:function(e){this.vertexSet.contains(e)||(e.setColor(O.graphVertex),this.vertexSet.add(e),this.adjacencyMap.put(e,new D))}},{key:"insertEdge",value:function(e){this.insertEdgeHelper(e),this.isDirected||this.insertEdgeHelper(new P(e.getEnd(),e.getStart(),e.getColor()))}},{key:"insertEdgeHelper",value:function(e){if(!this.edgeSet.contains(e)){var t=e.getStart(),i=e.getEnd();this.vertexSet.contains(t)?e.setStart(this.vertexSet.get(t)):(t.setColor(O.graphVertex),this.insertVertex(t)),this.vertexSet.contains(i)?e.setEnd(this.vertexSet.get(i)):(i.setColor(O.graphVertex),this.insertVertex(i));var n=e.getStart(),r=e.getEnd();e.setColor(O.graphEdge),this.edgeSet.add(e),this.adjacencyMap.get(n).outgoing.put(r,e),this.adjacencyMap.get(r).incoming.put(n,e)}}},{key:"removeVertex",value:function(e){this.vertexSet.remove(e);var t,i=this.adjacencyMap.get(e),n=Object(o.a)(i.incoming.values());try{for(n.s();!(t=n.n()).done;){var r=t.value;this.removeEdge(r)}}catch(c){n.e(c)}finally{n.f()}var a,s=Object(o.a)(i.outgoing.values());try{for(s.s();!(a=s.n()).done;){var l=a.value;this.removeEdge(l)}}catch(c){s.e(c)}finally{s.f()}this.adjacencyMap.remove(e)}},{key:"removeEdge",value:function(e){this.edgeSet.remove(e);var t=e.getStart(),i=e.getEnd();if(this.adjacencyMap.get(t).outgoing.remove(i),this.adjacencyMap.get(i).incoming.remove(t),!this.isDirected){this.adjacencyMap.get(t).incoming.remove(i),this.adjacencyMap.get(i).outgoing.remove(t);var n=new P(e.getEnd(),e.getStart(),e.getColor());this.edgeSet.remove(n)}}},{key:"clear",value:function(){this.vertexSet=new R,this.edgeSet=new R,this.adjacencyMap=new z}},{key:"getAdjacencyMap",value:function(){return this.adjacencyMap}},{key:"getIsDirected",value:function(){return this.isDirected}},{key:"setIsDirected",value:function(e){if(this.isDirected&&!e){var t,i=Object(o.a)(this.edgeSet.getSet());try{for(i.s();!(t=i.n()).done;){var n=t.value,r=new P(n.getEnd(),n.getStart(),n.getColor());this.insertEdge(r)}}catch(a){i.e(a)}finally{i.f()}}this.isDirected=e}},{key:"getShowWeights",value:function(){return this.showWeights}},{key:"setShowWeights",value:function(e){this.showWeights=e}},{key:"getShowPositions",value:function(){return this.showPositions}},{key:"setShowPositions",value:function(e){this.showPositions=e}}]),e}(),D=function(){function e(){Object(l.a)(this,e),this.incoming=void 0,this.outgoing=void 0,this.incoming=new z,this.outgoing=new z}return Object(c.a)(e,[{key:"equals",value:function(t){return t instanceof e&&null!=t&&(this.incoming===t.incoming&&this.outgoing===t.outgoing)}}]),e}(),W=i(14),F=function(){function e(){Object(l.a)(this,e),this.arr=void 0,this.arr=[]}return Object(c.a)(e,[{key:"enqueue",value:function(e){this.arr.push(e)}},{key:"dequeue",value:function(){var e=this.arr.shift();if(e)return e;throw new Error("Underflow.")}},{key:"peekFirst",value:function(){return this.isEmpty()?null:this.arr[0]}},{key:"isEmpty",value:function(){return 0===this.arr.length}}]),e}();function H(e,t){var i=new B,n=new R,r=[],a=new F;for(a.enqueue(t);!a.isEmpty();){var s=a.dequeue();if(!n.contains(s)){i.addFrame({outlineVertices:[s],redVertices:n.getSet(),redEdges:r}),n.add(s),i.addFrame({outlineVertices:[s],redVertices:n.getSet(),redEdges:r}),i.addFrame({outlineVertices:[s],redVertices:n.getSet(),redEdges:r,yellowEdges:e.outgoingEdges(s)});var l,c=Object(o.a)(e.outgoingEdges(s));try{for(c.s();!(l=c.n()).done;){var h=l.value,u=e.opposite(s,h);r.push.apply(r,Object(W.a)(e.outgoingEdges(s))),a.enqueue(u)}}catch(d){c.e(d)}finally{c.f()}}}return i.addFrame({redVertices:n.getSet(),redEdges:r}),i}function N(e,t){var i=new B;return q(e,t,new R,new z,i),i}function q(e,t,i,n,r){i.add(t),r.addFrame({outlineVertices:[t],redVertices:i.getSet(),redEdges:n.values()});var a,s=Object(o.a)(e.outgoingEdges(t));try{for(s.s();!(a=s.n()).done;){var l=a.value,c=e.opposite(t,l);i.contains(c)||(n.put(c,l),r.addFrame({outlineVertices:[t],redVertices:i.getSet(),redEdges:n.values(),yellowEdges:e.outgoingEdges(t)}),q(e,c,i,n,r),r.addFrame({outlineVertices:[t],redVertices:i.getSet(),redEdges:n.values()}))}}catch(h){s.e(h)}finally{s.f()}}var B=function(){function e(){Object(l.a)(this,e),this.frames=void 0,this.frames=[]}return Object(c.a)(e,[{key:"addFrame",value:function(e){this.frames.push(this.cloneFrame(e))}},{key:"getFrames",value:function(){return this.frames}},{key:"cloneArray",value:function(e){return e?e.slice(0,e.length):null}},{key:"cloneFrame",value:function(e){return{outlineVertices:this.cloneArray(e.outlineVertices),redVertices:this.cloneArray(e.redVertices),redEdges:this.cloneArray(e.redEdges),yellowVertices:this.cloneArray(e.yellowVertices),yellowEdges:this.cloneArray(e.yellowEdges),greenVertices:this.cloneArray(e.greenEdges),greenEdges:this.cloneArray(e.greenEdges)}}}]),e}(),K=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,e)).gridSizeValues=[100,80],n.animationSpeeds=[2e3,1e3,500,400,200,100,50,20],n.algorithms=void 0,n.onDirected=n.onDirected.bind(Object(h.a)(n)),n.onShowWeights=n.onShowWeights.bind(Object(h.a)(n)),n.onShowPositions=n.onShowPositions.bind(Object(h.a)(n)),n.onGridSizeChange=n.onGridSizeChange.bind(Object(h.a)(n)),n.onGenerateGrid=n.onGenerateGrid.bind(Object(h.a)(n)),n.onGenerateRandom=n.onGenerateRandom.bind(Object(h.a)(n)),n.onClear=n.onClear.bind(Object(h.a)(n)),n.onSelection=n.onSelection.bind(Object(h.a)(n)),n.onAnimationSpeedChange=n.onAnimationSpeedChange.bind(Object(h.a)(n)),n.onStart=n.onStart.bind(Object(h.a)(n)),n.onTest=n.onTest.bind(Object(h.a)(n)),n.algorithms={dfs:N,bfs:H},n.state={gridSize:0,animationSpeed:2,graph:new G(!1,!1,!1),isAnimating:!1,animationFrame:null,algorithm:Object.keys(n.algorithms)[0]},n}return Object(c.a)(i,[{key:"componentDidMount",value:function(){}},{key:"onDirected",value:function(e){this.state.isAnimating||(this.state.graph.setIsDirected(e),this.setState({}))}},{key:"onShowWeights",value:function(e){this.state.graph.setShowWeights(e),this.setState({})}},{key:"onShowPositions",value:function(e){this.state.graph.setShowPositions(e),this.setState({})}},{key:"onGridSizeChange",value:function(e){this.state.isAnimating||(this.state.gridSize>e&&this.state.graph.clear(),this.setState({gridSize:e}))}},{key:"onGenerateRandom",value:function(){if(!this.state.isAnimating){var e=this.gridSizeValues[this.state.gridSize],t=1600/e,i=800/e;this.state.graph.clear();for(var n=[1,2,3,4][A(0,3)],r=[1,2,3,4][A(0,3)],a=1;a<i;a+=r)for(var s=1;s<t;s+=n)T()&&T()&&this.state.graph.insertVertex(new C([s,a],O.graphVertex));var l,c=Object(o.a)(this.state.graph.vertices());try{for(c.s();!(l=c.n()).done;){var h,u=l.value,d=Object(o.a)(this.state.graph.vertices());try{for(d.s();!(h=d.n()).done;){var g=h.value;T()&&T()&&T()&&!u.equals(g)&&this.state.graph.insertEdge(new P(u,g,O.graphEdge))}}catch(v){d.e(v)}finally{d.f()}}}catch(v){c.e(v)}finally{c.f()}this.setState({})}}},{key:"onGenerateGrid",value:function(){if(!this.state.isAnimating){var e=this.gridSizeValues[this.state.gridSize],t=1600/e,i=800/e;this.state.graph.clear();for(var n=1;n<i;n++)for(var r=1;r<t;r++){var a=new C([r,n],O.graphVertex),s=new C([r+1,n],O.graphVertex),o=new C([r,n+1],O.graphVertex),l=new P(a,s,O.graphEdge),c=new P(a,o,O.graphEdge);r!==t-1&&this.state.graph.insertEdge(l),n!==i-1&&this.state.graph.insertEdge(c)}this.setState({})}}},{key:"onClear",value:function(){this.state.isAnimating||(this.state.graph.clear(),this.setState({}))}},{key:"onSelection",value:function(e){this.setState({algorithm:e})}},{key:"onAnimationSpeedChange",value:function(e){this.setState({animationSpeed:e})}},{key:"onStart",value:function(){var e=this;if(!this.state.isAnimating){var t=this.animationSpeeds[this.state.animationSpeed];if(0!==this.state.graph.vertices().length){this.setState({isAnimating:!0});for(var i=this.algorithms[this.state.algorithm](this.state.graph,this.state.graph.vertices()[0]).getFrames(),n=function(n){setTimeout((function(){e.setState({animationFrame:i[n]})}),(n+1)*t)},r=0;r<i.length;r++)n(r);setTimeout((function(){e.setState({isAnimating:!1,animationFrame:null})}),(i.length+1)*t+3e3)}}}},{key:"onTest",value:function(){console.log("testing."),console.log("end of test.")}},{key:"test1",value:function(){var e=this.state.graph.vertices(),t=this.state.graph.edges();console.log(e),console.log(t);var i,n=Object(o.a)(e);try{for(n.s();!(i=n.n()).done;){i.value.setColor(O.animBlue)}}catch(s){n.e(s)}finally{n.f()}var r,a=Object(o.a)(t);try{for(a.s();!(r=a.n()).done;){r.value.setColor(O.animBlue)}}catch(s){a.e(s)}finally{a.f()}this.setState({})}},{key:"test2",value:function(){this.onGenerateGrid();var e,t=this.state.graph.vertices(),i=this.state.graph.getAdjacencyMap(),n=0,r=0,a=Object(o.a)(t);try{for(a.s();!(e=a.n()).done;){var s,l=e.value,c=i.get(l),h=Object(o.a)(c.incoming.keySet());try{for(h.s();!(s=h.n()).done;){var u=s.value;t.includes(u)&&(console.log(u.toString()),n++)}}catch(f){h.e(f)}finally{h.f()}var d,g=Object(o.a)(c.outgoing.keySet());try{for(g.s();!(d=g.n()).done;){var v=d.value;t.includes(v)&&(console.log(v.toString()),r++)}}catch(f){g.e(f)}finally{g.f()}}}catch(f){a.e(f)}finally{a.f()}console.log(n),console.log(r),console.log(t.length)}},{key:"render",value:function(){return Object(v.jsxs)(r.a.Fragment,{children:[Object(v.jsx)(k,{gridSizeSliderProps:{label:"Grid Size",sliderLength:this.gridSizeValues.length,sliderValue:this.state.gridSize,onSliderChange:this.onGridSizeChange},animationSpeedSliderProps:{label:"Animation Speed",sliderLength:this.animationSpeeds.length,sliderValue:this.state.animationSpeed,onSliderChange:this.onAnimationSpeedChange},startButtonProps:{options:Object.keys(this.algorithms),onStart:this.onStart,onSelection:this.onSelection},graphProps:{onSelectDirectedEdges:this.onDirected,onSelectShowWeights:this.onShowWeights,onSelectShowVertexPositions:this.onShowPositions,onGenerateGrid:this.onGenerateGrid,onGenerateRandom:this.onGenerateRandom,onClear:this.onClear}}),Object(v.jsx)(I,{gridSize:this.gridSizeValues[this.state.gridSize],nodeRadius:5-this.state.gridSize,graph:this.state.graph,isAnimating:this.state.isAnimating,animationFrame:this.state.animationFrame})]})}}]),i}(r.a.Component),L=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,23)).then((function(t){var i=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;i(e),n(e),r(e),a(e),s(e)}))};s.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(K,{})}),document.getElementById("root")),L()}},[[22,1,2]]]);
//# sourceMappingURL=main.02d40d46.chunk.js.map
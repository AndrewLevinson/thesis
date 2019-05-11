
<template>
  <canvas ref="c" id="myCanvas" :width="width" height="400" resize></canvas>
</template>

<script>
import paper from "paper";

export default {
  name: "water",

  computed: {
    width() {
      return window.innerWidth;
    }
  },
  created: function() {
    // doesn't really do anything if I remove
    paper.install(window);
    paper.setup(this.$refs.c);
  },
  updated() {
    paper.view.draw();
  },

  mounted() {
    paper.setup(this.$refs.c);
    this.init = true;

    var width, height, center;
    var points = 10;
    var smooth = true;
    var path = new paper.Path();
    var mousePos = paper.view.center / 2;
    var pathHeight = mousePos.y;
    path.fillColor = "black";
    initializePath();

    function initializePath() {
      center = paper.view.center;
      width = window.innerWidth;
      // height = paper.view.size.height / 2;
      height = window.innerHeight * 0.5;
      path.segments = [];
      path.add(paper.view.bounds.bottomLeft);
      for (var i = 1; i < points; i++) {
        var point = new paper.Point((width / points) * i, center.y);
        path.add(point);
      }
      path.add(paper.view.bounds.bottomRight);
      path.fullySelected = true;
    }

    paper.view.onFrame = function(event) {
      pathHeight += (center.y - mousePos.y - pathHeight) / 10;
      for (var i = 1; i < points; i++) {
        var sinSeed = paper.view.event.count + (i + (i % 10)) * 100;
        var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
      }
      if (smooth) path.smooth({ type: "continuous" });
    };
    paper.view.onFrame(paper.view.event);

    paper.view.draw();

    paper.view.onMouseMove = function(event) {
      mousePos = paper.view.event.point;
    };

    // function onMouseDown(event) {
    //   smooth = !smooth;
    //   if (!smooth) {
    //     // If smooth has been turned off, we need to reset
    //     // the handles of the path:
    //     for (var i = 0, l = path.segments.length; i < l; i++) {
    //       var segment = path.segments[i];
    //       segment.handleIn = segment.handleOut = null;
    //     }
    //   }
    // }

    // // Reposition the path whenever the window is resized:
    // function onResize(event) {
    //   initializePath();
    // }
  }
};
</script>

<style>
/* CSS Emitted */
</style>

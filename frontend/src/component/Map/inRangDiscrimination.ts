export const judgeInclusion = function(location:Object, comparisonArr) {
    var deg = 0;
    var p1x = location.latitude;
    var p1y = location.longitude;
  
    for (var index = 0; index < comparisonArr.length; index++) {
      var p2x = comparisonArr[index].latitude;
      var p2y = comparisonArr[index].longitude;
      if (index < comparisonArr.length - 1) {
        var p3x = comparisonArr[index + 1].latitude;
        var p3y = comparisonArr[index + 1].longitude;
      } else {
        var p3x = comparisonArr[0].latitude;
        var p3y = comparisonArr[0].longitude;
      }
  
      var ax = p2x - p1x;
      var ay = p2y - p1y;
      var bx = p3x - p1x;
      var by = p3y - p1y;
  
      var cos = (ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by));
      deg += Math.acos(cos)* (180 / Math.PI);
    }
    if (Math.round(deg) == 360) {
      console.log("範囲内")
      return true;
    } else {
      console.log("範囲外")
      return false;
    }
  };
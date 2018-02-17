var table;
function preload(){
  table = loadTable('data/billionaires.csv', 'csv', 'header');
}

var people = {};
function setup() { 
  //can change colOfData to column num of whatever data you want
  createCanvas(500, 500);
  background(250,250,210);
  //change col to whatever column of data you want to look at
  var name1 = "Bill Gates";
  var nameColNum = 12;

  var person1 = {
      name : "Bill Gates",
      worthPerYear: { },
  } ;

  people.bill = person1;

  for(var row = 0; row < table.getRowCount(); row++)
  {

    var str = table.getString(row,nameColNum);
    //This will become a long else-if chain with more people
    if(str.toString() == person1.name)
    {
      // 22 is the column number for the 'worth in billions', so 21 with JS counting
      var year = table.getString(row,21);
      print(year);
      var gdp = table.getString(row, 20);
      print(gdp);
      person1["worthPerYear"][year] = parseFloat(gdp);
    }
  }


  
} 


function drawAxis(graphSize, maxValue){

  var offset = 50;
  strokeWeight(2);
  var point1 = {
      xCoord: offset,
      yCoord: offset
  }
  var point2 = {
      xCoord: offset,
      yCoord: graphSize - offset
  }
  var point3 = {
      xCoord: graphSize - offset,
      yCoord: graphSize - offset
  }

  //x-axis
  line(point1.xCoord, point1.yCoord, point2.xCoord, point2.yCoord);
  //y-axis
  line(point2.xCoord, point2.yCoord, point3.xCoord, point3.yCoord);

  // **Creates y-axis with incremental lines at changing values, depending on 

  var numIncrements = 5;
  var yincrementDist = (point2.yCoord - point1.yCoord) / numIncrements;
  var yincr = yincrementDist * numIncrements;

  var incrementVals = maxValue / numIncrements; 
  for(var i = 0; i < numIncrements; i++)
  {
    strokeWeight(1);
    stroke(192,192,192);
    //The +1 and -1 is to fix the increment lines to line up more cleanly
    line(point1.xCoord+1, point1.yCoord + (yincrementDist* i)-1, point3.xCoord, point1.yCoord+(yincrementDist * i)-1);
    var increment = maxValue - (i * (maxValue/numIncrements));
    //print('Increment '+increment);
    textAlign(RIGHT);
    text(increment.toString(),0, point1.yCoord + (yincrementDist*i) - 8 , 50, 50);
  }
  // ** /end of y-axis creation

  // ** Create x-axis showing each value
  var person1 = people.bill;
  var pointArr = [];

  var xcoords = [];
  var ycoords = [];
  for(x in person1.worthPerYear)
  {
    print('Key ' + x);
    var value = person1.worthPerYear[x];
    var valueFloat = parseFloat(value);
    print('Float value: ' + valueFloat);
    var yearXValue = map(x, 1996, 2014, point1.xCoord + 10, point3.xCoord);
    var p = {
                    xCoord : map(yearXValue, 0, graphSize, 15 + point1.xCoord, point3.xCoord),
                    yCoord : map(valueFloat, 0, 100, point2.yCoord, point1.yCoord)
                };
    pointArr.push(point);

    xcoords.push(p.xCoord);
    ycoords.push(p.yCoord);
    print(p.xCoord + ' y coord: ' + p.yCoord);

    //label the x-axis
    textAlign(CENTER);
    text(x, p.xCoord - 5, point2.yCoord + 15);
  }

  for(var i = 0; i < pointArr.length - 1; i++)
  {
    console.log(xcoords[i]);
    console.log(xcoords[i] + ' Ycoord ' + ycoords[i]);
    stroke('black');
    line(xcoords[i], ycoords[i], xcoords[i+1], ycoords[i+1]);
  }
  // ** /end of x-axis creation

  drawLabels(graphSize/2 );
}

function drawLabels(size)
{
  stroke(192,192,192)
  textSize(10);
  textAlign(CENTER);
  text('Wealth (billions)', 20, size, 10);
  text('Year', size-10, size*2 - 15);
  textAlign(CENTER);
  textSize(20);
  text('Bill Gates\' Worth Over Years ', size, 30);
}


function draw() { 
  background(500);
  background(250,250,210);
  //Draw Axis also draw's the bars (saves having to pass information along methods)
  drawAxis(500, 100);


  noLoop();
}


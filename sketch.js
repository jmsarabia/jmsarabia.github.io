var table;
function preload(){
	table = loadTable('data/billionaires.csv', 'csv');

}

var counts = {};
var typeName = '';
//How do i make a map like structure, to keep hold of the type and the count
function setup() { 
  //can change colOfData to column num of whatever data you want
  createCanvas(500, 500);
  background(250,250,210);
  print(table.getRowCount() + ' total rows in table');
  //change col to whatever column of data you want to look at
  var col = 19;
  var arr = [];
   for(var row = 0; row < table.getRowCount(); row++)
   {
     
     var str = table.getString(row,col);
     //Add string to the array if it's not undefined/null (no name, empty data)
     if(str != "" && row > 0)
     {
      arr.push(str);
     }

     if(row == 0)
     {
      typeName = table.getString(row,col);
     }
     
   }
  //THIS FINALLY WORKS TO KEEP COUNT OF EACH WEALTH TYPE, storing the count in each
    //also works: //counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  
  for (var i = 0; i < arr.length; i++) {

      if(counts[arr[i]] > 0)
      {
        counts[arr[i]] = 1 + counts[arr[i]];
      }
      else
      {
        counts[arr[i]] = 1;
      }
  }
  for(var x in counts)
  {
    print('Key2: ' + x + '\n');
    print('---Value2: ' + counts[x]);
  }
  noLoop();
} 


function drawAxis(graphSize, maxValue, numOf){

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
  //number of categories
  var numOfCats = 0;
  for(var x in counts)
  {
    if(counts.hasOwnProperty(x) && x != null && x != undefined)
      numOfCats++;
  }

  //xStart = start of the x - bars; spaceBtwnBars = space between the bars
  var space = 10;
  var xStart = point2.xCoord + space;
  var spaceBtwnBars = space * (numOfCats + 2);  //+2 for space at beg/end

  var xLength = point3.xCoord - point2.xCoord;
  var barWidth = (xLength - spaceBtwnBars) / numOfCats;

  //    read through the counts map, make the bars, and place on the graph
  var newYCoord = 0;
  print('Bar width ' + barWidth + 'X Axis length ' + xLength );
  var xAxis = point2.yCoord;
  var ratio = (point1.yCoord - point2.yCoord) / maxValue; 
  var barCount = 1;
  for(var category in counts)
  {
    newYCoord = xAxis + (counts[category] * ratio);
    print(newYCoord);
    fill(135,206,235);
    rect(barCount*spaceBtwnBars,newYCoord, barWidth, xAxis - newYCoord -2);
    fill('black');
    textSize((1/numOfCats)*40);
    textAlign(CENTER);
    text(category, barCount*spaceBtwnBars + (0.5 * barWidth) - 4, xAxis + 10, 10);
    barCount++;
  }
  // ** /end of x-axis creation

  drawLabels(graphSize/2 );
}

function drawLabels(size)
{
  textSize(10);
  text('Count', 15, size);
  text(typeName, size-10, size*2 - 15);
  textAlign(CENTER);
  textSize(20);
  text('Count of Different Wealth Types', size, 30);
}


function draw() { 
  background(500);
  background(250,250,210);
  //Draw Axis also draw's the bars (saves having to pass information along methods)
  drawAxis(500, 1000);
  

  noLoop();
}


//if (‘cat’ in animal)
//{
     // modify cat key here
//    animal[cat].sound = ‘hiss’;
//}


//we can scale by multiplying out the 

//For bar chart, you can find the y-axis range from 
//		for-loop to find the max (min will always be 0)
//		- y-axis will always have tick value

//localhost:8000

//C:\Jareds_Stuff\1_JuniorYear\Spring_2018\1_DataVis\Assignment\As2_P5

//once in the directory, type: python -m http.server 8000

//0,0 for coourdinate axis is in the top left of the canvas
// 	with the y-axis going downwards (100 is below 0)

//every "print" function slows down the code - remove after debugging
//		-especially slow if in draw function

//we can change the data, just mention we did

//make sure gist is public

// in borwser: bl.ocks.org/jmsarabia (github name)

//it will load the sketch in the browser

//when submitting, submit the gist

//you can make a long url loadTable('cs.usfca.edu/~jmsarabia/cs360/data/billionaires.csv')

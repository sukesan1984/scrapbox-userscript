  class Time{
        constructor(hour, min){
            this.hour = hour;
            this.min = min;
        }
        addMin(min){
            this.min += min;
            if(this.min >= 60){
                this.min -= 60;
                this.addHour(1)
            }
            return this;
        }
        addHour(hour){ this.hour += hour
            if(this.hour > 23){
                this.hour = this.hour - 24
            }
            return this;
        }
        toString(){
            return ('00' + this.hour).slice(-2) + ":" + ('00' + this.min).slice(-2);
        }
    }
    class Exporter{
      constructor(){
          this.outputs = [];
      }
      addLine(line){
          this.outputs.push(line);
      }
      get(){
          return this.outputs.join("\n");
      }
    }
    class Pomodoro{ constructor(exporter, initialTime){
          this.exporter = exporter;
          this.time = initialTime
          this.pomodoroCycle = 25;
          this.shortBreak = 5;
          this.longBreak = 15;
          this.index = 1;
      }
      createTimeRange(startTime, endTime){
          return startTime + "-" + endTime;
      }
      createPomodoro(count){
          for (var i = 1; i <= count; i++){
              var result = ('00' + this.index).slice(-2)
              var breakPeriod = (this.index % 4) == 0 ? this.longBreak : this.shortBreak;
              this.exporter.addLine(this.createTimeRange(this.time.toString(), this.time.addMin(this.pomodoroCycle).toString()) + " : " + result + " pomodoros")
              this.exporter.addLine(this.createTimeRange(this.time.toString(), this.time.addMin(breakPeriod).toString()) + " : " + breakPeriod +"分間休憩")
              if(this.index % 4 == 0){
                  this.exporter.addLine("");
              }
              this.index += 1
          }
      }
    }
    scrapbox.PopupMenu.addButton({
        title: 'pomodoro',
        onClick: text => {
    //        var text = "10:15,6";
            var times = text.match(/\d{1,2}/g)
            var sh, sm, period;
            [sh, sm, period] = times.map(x => parseInt(x))
            var time = new Time(sh, sm);
            var exporter = new Exporter();
            var pomodoro = new Pomodoro(exporter, time);
            pomodoro.createPomodoro(period)
            return exporter.get()
       }
    })

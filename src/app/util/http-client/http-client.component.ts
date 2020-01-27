import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpEvent,HttpEventType } from "@angular/common/http";

import { Observable, of,forkJoin} from "rxjs";
import { tap } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.test1();
    this.test2();
  }

  test1():void{
    this.todos$ = this.http
      .get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10"
      )
      .pipe(tap(console.log));
  }

  //设置查询参数  -- 创建 HttpParams 对象
  test2():void{
    this.todos$ = this.http
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", { params })
    .pipe(tap(console.log));
  }

  //获取完整响应
  test3():void{
    this.http.get("https://jsonplaceholder.typicode.com/todos/1", {
      observe: "response"
    })
    .subscribe(res => {
       console.dir("Response: " + res.status);
    });
  }

  //设置响应类型
  //如果你期望的响应对象的格式不是 JSON，你可以通过 responseType 属性来设定响应类型
  //需要注意的是除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型。
  test4():void{
    this.http.get("https://jsonplaceholder.typicode.com/todos/1", {
      responseType: "text"
    }).subscribe(text => {
      console.log("Response: " + text);
    });
  }

  //设置 Http Headers
  test5():void{
    this.todos$ = this.http
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        headers,
        params
     })
     .pipe(tap(console.log));
  }

  //Put request (update)
  test6():void{
    const headers = new HttpHeaders().set(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    this.http
    .put( //the put method is used for update
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        userId: 1,
        id: 1,
        title: "hello hobart",
        completed: true
      },
      { headers }
    )
    .subscribe(
      val => {
        console.log("Put call successful value returned in body", val);
      },
      error => {
        console.log("Put call in error", error);
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );
  }


  //Delete request (delete)
  test7():void{
    const headers = new HttpHeaders().set(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    this.http
      .delete("https://jsonplaceholder.typicode.com/todos/1", {
        headers
      })
      .subscribe(
        val => {
          console.log("Delete call successful value returned in body", val);
        },
        error => {
          console.log("Delete call in error", error);
        },
        () => {
          console.log("The Delete observable is now completed.");
        }
      );
  }

   //Post request (post)
   test8():void{
    const headers = new HttpHeaders().set(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    this.http
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        userId: 1,
        title: "learn ionic 4",
        completed: false
      },
      { headers }
    )
    .subscribe(
      val => {
        console.log("Post call successful value returned in body", val);
      },
      error => {
        console.log("Post call in error", error);
      },
      () => {
        console.log("The Post observable is now completed.");
      }
    );
  }

  //并行发送多个 Http 请求
  test9():void{
    const parallel$ = forkJoin(
      this.http.get("https://jsonplaceholder.typicode.com/users/1"),
      this.http.get("https://jsonplaceholder.typicode.com/todos/1")
    );

    parallel$.subscribe(values => {
      console.log("all values", values);
    });
  }

  //顺序发送 Http 请求
  test10():void{
    const sequence$ = this.http
    .get<Todo>("https://jsonplaceholder.typicode.com/todos/1")
    .pipe(
      switchMap(todo => {
        todo.title += " - TEST ";
        return this.http.put("https://jsonplaceholder.typicode.com/todos/1", todo);
      })
    );

    sequence$.subscribe(val => {
      console.log("Put call successful value returned in body", val);
    });
  }

  //获取顺序发送 Http 请求的结果
  test11():void{
    const sequence$ = this.http
      .get<Todo>("https://jsonplaceholder.typicode.com/todos/1")
      .pipe(
        switchMap(
          todo => {
            const newTitle = todo.title + " - TEST ";
            const newTodo = { ...todo, title: newTitle };
            return this.http.put(
              "https://jsonplaceholder.typicode.com/todos/1",
              newTodo
            );
          },
          (firstHTTPResult, secondHTTPResult) => [
            firstHTTPResult,
            secondHTTPResult
          ]
        )
      );

    sequence$.subscribe(val => {
      console.log("Put call successful value returned in body", val);
    });
  }

  //Http 进度事件
  test12():void{
    this.http
    .get("https://jsonplaceholder.typicode.com/todos", {
      observe: 'events',
      reportProgress: true
    })
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("Request sent!");
          break;
        case HttpEventType.ResponseHeader:
          console.log("Response header received!");
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          console.log("Done!", event.body);
      }
    });
  }


  throwError(){
    this.http
    .get("https://jsonplaceholder.typicode.com/simulate-error")
    .pipe(
      catchError(error => {
        console.error("Error catched", error);
        return of({ description: "Error Value Emitted" });
      })
    )
    .subscribe(
      val => console.log("Value emitted successfully", val),
      error => {
        console.error("This line is never called ", error);
      },
      () => console.log("HTTP Observable completed...")
    );
  }

}

//const params = new HttpParams().set("_page", "1").set("_limit", "10");
const params = new HttpParams();
params.set("_page", "1");
params.set("_limit", "10");
//需要注意的是，我们通过链式语法调用 set() 方法，构建 HttpParams 对象。这是因为 HttpParams 对象是不可变的，通过 set() 方法可以防止该对象被修改。
//每当调用 set() 方法，将会返回包含新值的 HttpParams 对象，因此如果使用下面的方式，将不能正确的设置参数。

const headers = new HttpHeaders();
headers.set("token", "tasmania");

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
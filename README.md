# React
참고 - <a href="https://ko.reactjs.org/">React Docs</a>
-----
### JSX

React에서 본질적으로 렌더링 로직이 UI 로직(이벤트가 처리되는 방식, 시간에 따라 state가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등)과 연결되는 방식이다.

```jsx
const name = "yoonsang";
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
	element,
	document.getElementById('root')
);
```

### Element

React 앱의 가장 작은 단위.

브라우저 * DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체(pure object)이며 쉽게 생성할 수 있다.

- * DOM
    
    Document Object Model
    
    XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스.
    
    W3C의 표준 객체 모델이며 계층 구조를 띔.
    

React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.

```jsx
<div id="root"></div>
```

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 루트DOM노드라고 부른다.

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ReactDOM.render()로 전달하면 된다.

React 엘리먼트는 **불변객체(Immutable Object)**이다.

엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다.

### Component

JavaScript의 함수와 유사하다. **Props**라고 하는 임의의 Input을 받은 후 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 Output한다.

- 함수 컴포넌트
    
    ```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```
    
    위 함수는 데이터를 가진 하나의 props 객체를 Input으로 받은 후 React 엘리먼트를 Output.
    
- 클래스 컴포넌트
    
    ```jsx
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    ```
    
    함수 컴포넌트와 클래스 컴포넌트는 동일하지만 클래스에 몇가지 추가 기능이 있다.
    

이전까지는 DOM 태그만을 사용해 React 엘리먼트를 나타냈지만

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.

```jsx
const element = <Welcome name="Sara" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 props 라고 한다.

props는 읽기전용이므로 절대 수정해서는 안된다.

→ 함수 내부에서 값을 변경하는 작업을 해선 안된다는 뜻.

State에 대해서 배울 시점.

### State

앞서 DOM 렌더링을 직접 수정했는데 이제 내부 컴포넌트가 스스로 업데이트하도록 만들려고 한다.

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

그러기 위해서는 컴포넌트에 state를 추가해야 한다.

State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

**생명주기 메소드를 클래스에 추가하기**

Clock 컴포넌트가 DOM에 렌더링 될 때마다 타이머를 설정하려 하는 

이 일련의 과정을 React에서는 **마운팅**이라고 한다.

Clock 컴포넌트가 DOM이 삭제될 때마다 타이머를 해제하려고 하는 과정은

**언마운팅** 이라고 한다.

컴포넌트 클래스에서 특별한 메소드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
		this.timerID = setInterval(
	      () => this.tick(),
	      1000
		  );
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

**생명주기 메소드**

componentDidMount() 메소드

컴포넌트 출력물이 DOM에 렌더링 된 후에 실행.

타이머를 설정하기에 적합한 장소

componentWillUnmount() 메소드

컴포넌트가 언마운팅 될때 실행.

타이머를 클리어 해주기 적합한 장소

**this.setState()**

```jsx
this.state.name = 'yoonsang'; // x
```

위와 같이 직접 state를 수정해선 안된다.

대신 setState를 이용해 주어야 한다.

```jsx
this.setState({ name : 'yoonsang' });
```

또한 this.state를 지정할 수 있는 유일한 공간은 constructor 내부에서이다.

그리고 state의 업데이트는 상황에 따라 비동기적일 수 있는데,

setState 될 new State가 prev State와 의존관계에 있어서는 안된다.

즉, 

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

위와 같이 작성하면 업데이트가 되지 않을 수 있다.

위와 같은 로직을 사용하기 위해서는 아래와 같이 작성할 수 있다.

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

또한 state 업데이트는 병합된다.

setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

```jsx
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

위와 같이 setState() 호출을 별도로 하여 독립적으로 업데이트할 수 있다.

즉, this.setState({ comments })는 this.state.posts에 영향을 주지 않는다.

**데이터는 아래로 흐른다.**

컴포넌트는 부모-자식 간 유상태인지 무상태인지 알 수 없고 함수 혹은 클래스로 정의되었는지는 무관하다.

이때문에 state는 캡슐화가 된다고 얘기가 된다.

state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

### 이벤트 처리

React 엘리먼트의 이벤트 처리방싱근 DOM 엘리먼트의 이벤트 처리 방식과 매우 유사하다.

차이점

- 캐멀 케이스 명명
- 문자열이 아닌 함수로 이벤트 핸들러 전달
- preventDefault를 명시적으로 호출해야지만 기본 동작을 방지 가능. (false 반환 x)

**this 바인딩**

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

- JavaScript에서 클래스 메소드는 기본적으로 바인딩 되어 있지 않다
- this.handleClick 이 작동하려면 constructor에서 바인딩을 해주어야 한다.
- 바인딩을 하지 않아도 되는 방법
    - 클래스 필드를 사용하여 콜백을 바인딩 (퍼블릭 클래스 필드 문법 - CRA에서는 작동 default)
    - Arrow Function
    

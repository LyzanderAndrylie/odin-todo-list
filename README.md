# Odin Todo List

Simple Todo List created with JavaScript. This program utilize `localStorage` to store the projects' data.

## Result

Check out here! :smile:

:link: TBA

## Requirements

To check out full requirements, click this [link](https://www.theodinproject.com/lessons/node-path-javascript-todo-list "Project: Todo List")  

## Note

List of resources that helped me to create this project:

1. <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>
2. <https://stackoverflow.com/questions/29293302/button-position-absolute-not-working-as-expected>

### `flex-1` vs `w-full` in `<input type="text">` element

Somehow the code below (`flex-1` vs `w-full`) gives different results/behaviour for `<input type="text">` element.

```html
<div class="flex">
    <input
    type="text"
    class="w-full rounded-l-xl border border-slate-200 bg-slate-50 p-1"
    placeholder="New Project Name"
    />
<div>
```

```html
<div class="flex">
    <input
    type="text"
    class="flex-1 rounded-l-xl border border-slate-200 bg-slate-50 p-1"
    placeholder="New Project Name"
    />
<div>
```

# BaseComponent Store

## SOLUTION 1

Thanks to: https://dev.to/this-is-angular/removing-boilerplate-code-in-ngrx-component-store-1f83
with example code: https://stackblitz.com/edit/angular-ivy-rgps6q?file=src%2Fapp%2Fbase-component.store.ts

---

There is a problem with this solution 1.
Watching console we can see that `tap` on `vm$` is called twice. On storeWithBaseComponent on console log we had

One with items and without users:

```ts
vm object:{"items":[{"name":"giovanni"},{"name":"marco"}],"loading":false,"error":null}
```

And finally users is here, but it's a copy of items:

```ts
vm object:{"items":[{"name":"giovanni"},{"name":"marco"}],"loading":false,"error":null,"users":[{"name":"giovanni"},{"name":"marco"}]}
```
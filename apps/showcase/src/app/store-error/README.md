# Store Error

To handle error with ComponentStore I prefer to use a `vm` with an `error` property.

```ts
// ViewModel for the component
  readonly vm$ = this.select(
    this.items$,
    this.loading$,
    this.error$,
    (items, loading, error) => ({
      items,
      loading,
      error,
    })
  );
```

In HTML we can catch this error with

```html
<ng-container *ngrxLet="vm$ as vm">
  <ng-container *ngIf="vm.items">

    .....
  </ng-container>
  <h4 *ngIf="vm.error">ERROR VM: {{ vm.error }}</h4>
</ng-container>
```

---

It is also possible to show a notification when error is catched

```ts
vm$ = this.fakeDataStore.vm$.pipe(
    tap((t) => {
      if (t.error !== null) {
        //show notification
        this.toastrService.error(t.error);
      }
    })
  );
```

## Resources
- https://indepth.dev/posts/1408/how-to-manage-angular-state-in-your-components
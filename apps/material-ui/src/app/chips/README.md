# Angular Material Chips

## Multi Select Chips Component with Angular Material

Add `<mat-chip-listbox selectable multiple`

## Style CSS variable

With Angular >= 9 we can change css variable with `[style.--mdc-chip-elevated-container-color]="varibleName"`

```html
<mat-chip-option
      *ngFor="let chip of tags"
      color="accent"
      [style.--mdc-chip-elevated-container-color]="colorVar"
    >
```
```ts
//update css variable
public colorVar: string = 'red';
```

## Resources

- https://www.zoaibkhan.com/blog/create-a-multi-select-chips-component-with-angular-material/
- 
import { ActivatedRoute } from "@angular/router";

export function scrollOnInit(route: ActivatedRoute) {
  const fragment = route.snapshot.fragment;
  if (fragment == null || fragment === "") {
    scrollTop();
    return;
  }
  const elt = document.querySelector("#" + fragment);
  if (elt) {
    elt.scrollIntoView();
  } else {
    scrollTop();
  }
}

function scrollTop() {
  document.querySelector("#scroll-container")?.scrollTo(0, 0);
}

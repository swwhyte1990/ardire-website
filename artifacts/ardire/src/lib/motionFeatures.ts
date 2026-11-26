// framer-motion's animation features, loaded on their own after the first render
// (see LazyMotion in App.tsx). Until they arrive, motion elements render in their
// initial state, which is the same first frame they would show anyway.
export { domAnimation as default } from "framer-motion";

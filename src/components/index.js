import { PostPass } from "../lib";

__mod_rollup_imports__;

export function setup() {
    PostPass.run();
    __mod_rollup_setup__;
}

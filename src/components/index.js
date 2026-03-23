import { PostPass } from "@local/lib/pass";

__mod_rollup_imports__;

export function setup() {
    PostPass.run();
    __mod_rollup_setup__;
}

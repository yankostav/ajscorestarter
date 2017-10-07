import { Routes, RouterModule } from "@angular/router";

import { Settings }  from "../features/settings";
import { Splash }    from "../features/splash";
import { Analytics } from "../features/analytics";
import { Features } from "../features/features";

const appRoutes: Routes = [
    { path: "settings", component: Settings },
    { path: "", component: Splash },
    { path: "splash", component: Splash },
    { path: "analytics", component: Analytics },
    { path: "features", component: Features },
    { path: "**", redirectTo: "/splash", pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Visitor;
use Jenssegers\Agent\Agent;

class LogVisitor
{
    public function handle(Request $request, Closure $next)
    {
        $visitor = Visitor::where('ip_address', $request->ip())->first();
        $agent = new Agent();
        $agent->setUserAgent($request->userAgent());
        $device = $agent->device();
        $platform = $agent->platform();
        $browser = $agent->browser();

        if (!$visitor) {
            Visitor::create([
                'ip_address'      => $request->ip(),
                'user_agent'      => $request->userAgent(),
                'referer'         => $request->header('referer'),
                'device'          => $device,
                'platform'        => $platform,
                'browser'         => $browser,
            ]);
        }
        return $next($request);
    }
}

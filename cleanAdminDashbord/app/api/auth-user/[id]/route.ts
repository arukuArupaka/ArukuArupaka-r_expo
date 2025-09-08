import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// このエンドポイントは service_role キーを使用して auth.users から直接ユーザーを取得します。
// フロントからは /api/auth-user/:id で呼び出し、メールアドレス等を取得。

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const userId = params.id
    if (!userId) {
        return NextResponse.json({ error: 'missing id' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: { autoRefreshToken: false, persistSession: false },
        }
    )

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)
    if (error || !data?.user) {
        return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json({
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
        last_sign_in_at: data.user.last_sign_in_at,
    })
}

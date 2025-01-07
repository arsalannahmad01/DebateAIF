import Practice from './pages/Practice';

<Routes>
  <Route path="/practice" element={
    <ProtectedRoute>
      <Practice />
    </ProtectedRoute>
  } />
</Routes> 